import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import newsBg from "@/assets/news-bg.jpg";

const News = () => {
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await supabase.from("news").select("*").eq("published", true).order("created_at", { ascending: false });
      return data || [];
    },
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });

  const isLoading = newsLoading || blogLoading;

  return (
    <>
      <SEO
        title="News & Blog - Latest Updates"
        description="Stay updated with the latest news, articles, and insights from MUMBSO. Read about biotechnology research, events, and student achievements."
        keywords="MUMBSO news, biotech updates, molecular biology articles, student blog, biotechnology insights"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={newsBg}
              alt="Biotechnology news and discoveries"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
          </div>
          <div className="container text-center relative z-10">
            <h1 className="text-4xl font-bold mb-6 text-white">News & Blog</h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Latest updates, articles, and insights from MUMBSO
            </p>
          </div>
        </section>

        {isLoading ? (
          <section className="py-20">
            <div className="container text-center">Loading...</div>
          </section>
        ) : (
          <>
            {/* News Section */}
            {news && news.length > 0 && (
              <section className="py-20">
                <div className="container">
                  <h2 className="text-3xl font-bold mb-8">Latest News</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {news.map((n: any) => (
                      <Card key={n.id} className="hover:shadow-card transition-shadow">
                        <CardContent className="p-6">
                          {n.category && (
                            <Badge variant="secondary" className="mb-3">
                              {n.category}
                            </Badge>
                          )}
                          <h3 className="font-bold text-lg mb-2">{n.title}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{n.excerpt}</p>
                          {n.created_at && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{format(new Date(n.created_at), "MMM d, yyyy")}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Blog Posts Section */}
            {blogPosts && blogPosts.length > 0 && (
              <section className="py-20 bg-muted/50">
                <div className="container">
                  <h2 className="text-3xl font-bold mb-8">Blog Articles</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                      <Card key={post.id} className="hover:shadow-card transition-shadow">
                        {post.featured_image_url && (
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img
                              src={post.featured_image_url}
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {post.category && <Badge variant="secondary">{post.category}</Badge>}
                          </div>
                          <CardTitle className="text-xl hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt || post.content?.substring(0, 150) + "..."}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {post.author_name && (
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{post.author_name}</span>
                              </div>
                            )}
                            {post.published_at && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(post.published_at), "MMM d, yyyy")}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {(!news || news.length === 0) && (!blogPosts || blogPosts.length === 0) && (
              <section className="py-20">
                <div className="container text-center text-muted-foreground">
                  No news or articles published yet. Check back soon!
                </div>
              </section>
            )}
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default News;
