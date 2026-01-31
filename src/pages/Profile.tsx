import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2, Upload, Save, Home, AlertCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ALL_INTERESTS } from "@/constants/interests";
import { validatePhoneNumber, formatPhoneNumber } from "@/lib/validation";

interface Profile {
  id: string;
  first_name: string;
  surname: string;
  email: string;
  phone: string;
  year_of_study: string;
  course: string;
  interests: string;
  is_alumni: boolean;
  avatar_url: string | null;
  created_at: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAlumni, setIsAlumni] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [phoneError, setPhoneError] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone: "",
    year_of_study: "Year 1",
    course: "Medical Biotechnology with IT",
    interests: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        if (data) {
          const profile = data as unknown as Profile;
          setProfile(profile);
          setFormData({
            first_name: profile.first_name || "",
            surname: profile.surname || "",
            email: profile.email || "",
            phone: profile.phone || "",
            year_of_study: profile.year_of_study || "Year 1",
            course: profile.course || "Medical Biotechnology with IT",
            interests: profile.interests || "",
          });
          setIsAlumni(profile.is_alumni || false);
          setImagePreview(profile.avatar_url);
          
          if (profile.interests) {
            setSelectedInterests(profile.interests.split(", ").filter(Boolean));
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({ title: "Error", description: "Failed to load profile", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Max 5MB", variant: "destructive" });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        toast({ title: "Limit reached", description: "Maximum 3 interests", variant: "destructive" });
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setPhoneError("");

    try {
      // Validate phone if provided
      if (formData.phone && !validatePhoneNumber(formData.phone)) {
        setPhoneError("Please enter a valid Kenyan phone number");
        setIsSaving(false);
        return;
      }

      let avatarUrl = imagePreview;

      // Upload image if changed
      if (imageFile) {
        const fileName = `${user?.id}-${Date.now()}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        avatarUrl = urlData.publicUrl;
      }

      // Update profile
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name,
          surname: formData.surname,
          email: formData.email,
          phone: formData.phone ? formatPhoneNumber(formData.phone) : "",
          year_of_study: isAlumni ? "Alumni" : formData.year_of_study,
          course: formData.course,
          interests: selectedInterests.join(", "),
          is_alumni: isAlumni,
          avatar_url: avatarUrl,
        })
        .eq("id", user?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...formData, avatar_url: avatarUrl } : null);
      setImageFile(null);

      toast({ title: "Success", description: "Profile updated successfully" });
    } catch (error) {
      const err = error as Error;
      console.error("Error updating profile:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Edit Profile - MUMBSO"
        description="Update your MUMBSO profile information, photo, and preferences."
      />
      <Header />

      <section className="py-12 bg-accent/5 border-b">
        <div className="container">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <Home className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Profile</h1>
              <p className="text-muted-foreground">Update your membership information</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSave} className="space-y-8">
              {/* Profile Picture */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Upload a professional profile photo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-4 border-muted-foreground/20">
                          <span className="text-xs text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="avatar" className="block mb-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors w-fit">
                          <Upload className="w-4 h-4" />
                          Choose Image
                        </div>
                      </label>
                      <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your basic member details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        disabled
                        className="bg-muted cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Cannot be changed</p>
                    </div>
                    <div>
                      <Label htmlFor="surname">Surname</Label>
                      <Input
                        id="surname"
                        value={formData.surname}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        disabled
                        className="bg-muted cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Cannot be changed</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled
                      className="bg-muted cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Cannot be changed</p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setPhoneError("");
                      }}
                      placeholder="0712345678"
                      className={phoneError ? "border-destructive" : ""}
                    />
                    {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
                    {!phoneError && <p className="text-xs text-muted-foreground mt-1">Format: 0712345678 or +254712345678</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>Your academic details and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="alumni-toggle"
                        checked={isAlumni}
                        onCheckedChange={(checked) => setIsAlumni(checked as boolean)}
                      />
                      <Label htmlFor="alumni-toggle" className="font-normal cursor-pointer">
                        I am an Alumni
                      </Label>
                    </div>

                    {!isAlumni && (
                      <div>
                        <Label htmlFor="year-select">Year of Study</Label>
                        <select
                          id="year-select"
                          title="Year of Study"
                          value={formData.year_of_study}
                          onChange={(e) => setFormData({ ...formData, year_of_study: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg bg-background"
                        >
                          <option value="Year 1">Year 1</option>
                          <option value="Year 2">Year 2</option>
                          <option value="Year 3">Year 3</option>
                          <option value="Year 4">Year 4</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="course">Course / Program</Label>
                    <div className="p-3 bg-muted rounded-lg border border-muted-foreground/20">
                      <p className="font-semibold text-sm">{formData.course}</p>
                      <p className="text-xs text-muted-foreground mt-1">(Pre-filled and cannot be changed)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Areas of Interest */}
              <Card>
                <CardHeader>
                  <CardTitle>Areas of Interest</CardTitle>
                  <CardDescription>Select up to 3 areas of interest (can be updated)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {ALL_INTERESTS.map((categoryGroup) => (
                    <div key={categoryGroup.category}>
                      <h4 className="font-semibold text-sm mb-4 text-primary">{categoryGroup.category}</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {categoryGroup.items.map((interest) => (
                          <div key={interest} className="flex items-center">
                            <Checkbox
                              id={`interest-${interest}`}
                              checked={selectedInterests.includes(interest)}
                              onCheckedChange={() => toggleInterest(interest)}
                              disabled={selectedInterests.length >= 3 && !selectedInterests.includes(interest)}
                            />
                            <Label htmlFor={`interest-${interest}`} className="ml-3 font-normal cursor-pointer text-sm">
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm">Selected: <span className="font-semibold">{selectedInterests.length}/3</span></p>
                  </div>
                </CardContent>
              </Card>

              {/* Account Notice */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Account Security</p>
                      <p>To change your email address or password, please contact support.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="flex-1">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;