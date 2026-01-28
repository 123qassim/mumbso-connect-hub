import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import resourcesBg from "@/assets/resources-bg.jpg";
import mumbsoLogo from "@/assets/mumbso-logo.jpg";
import { SEO } from "@/components/SEO";
import jsPDF from "jspdf";

const Constitution = () => {
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPos = 20;
    const margin = 20;
    const lineHeight = 6;

    // Helper function to check and add new page
    const checkPageBreak = (requiredSpace: number = 20) => {
      if (yPos + requiredSpace > pageHeight - 20) {
        pdf.addPage();
        yPos = 20;
      }
    };

    // Helper function to add text with wrapping
    const addText = (text: string, x: number, fontSize: number = 10, isBold: boolean = false, indent: number = 0) => {
      pdf.setFontSize(fontSize);
      pdf.setFont(undefined, isBold ? 'bold' : 'normal');
      const lines = pdf.splitTextToSize(text, pageWidth - margin * 2 - indent);
      checkPageBreak(lines.length * lineHeight);
      pdf.text(lines, x, yPos);
      yPos += lines.length * lineHeight;
    };

    // Add logo centered
    const img = new Image();
    img.src = mumbsoLogo;
    img.onload = () => {
      const imgWidth = 40;
      const imgHeight = 40;
      const xPos = (pageWidth - imgWidth) / 2;
      pdf.addImage(img, 'JPEG', xPos, yPos, imgWidth, imgHeight);
      yPos += imgHeight + 5;
      
      // Add organization name
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      const orgName = "Maseno University Medical Biotechnology Student Organization";
      const orgNameWidth = pdf.getTextWidth(orgName);
      pdf.text(orgName, (pageWidth - orgNameWidth) / 2, yPos);
      yPos += 10;
      
      // Add constitution title
      pdf.setFontSize(12);
      const title = "CONSTITUTION";
      const titleWidth = pdf.getTextWidth(title);
      pdf.text(title, (pageWidth - titleWidth) / 2, yPos);
      yPos += 10;
      
      // Vision
      addText("VISION:", margin, 11, true);
      addText("To ensure Maseno University medical biotechnology student organization members enhance their exposure in the medical field.", margin);
      yPos += 5;
      
      // Mission
      addText("MISSION:", margin, 11, true);
      addText("To integrate collaborations for research, excellence and to establish core facilities to meet the needs of advanced medical biotechnological research.", margin);
      yPos += 5;
      
      // Core Values
      addText("CORE VALUES:", margin, 11, true);
      addText("1. Team work", margin + 5);
      addText("2. Hard work", margin + 5);
      addText("3. Creativity", margin + 5);
      yPos += 10;
      
      // Article I
      checkPageBreak(30);
      addText("ARTICLE I: NAME AND OBJECTIVES", margin, 11, true);
      addText("Section A: NAME", margin, 10, true);
      addText("The name of the organization is Maseno University medical biotechnology student organization but shall be known as MUMBSO.", margin);
      yPos += 5;
      
      addText("Section B: OBJECTIVES", margin, 10, true);
      addText("1. To propel medical biotechnology to greater heights.", margin + 5);
      addText("2. To facilitate research parasitic and microbial infections using biotechnological tools.", margin + 5);
      addText("3. Coordinate industrial training and visit to the medical research institutes and maintain quality standards.", margin + 5);
      yPos += 10;
      
      // Article II
      checkPageBreak(30);
      addText("ARTICLE II: MEMBERSHIP", margin, 11, true);
      addText("Section A: Eligibility", margin, 10, true);
      addText("Part 1: Membership shall be open to those who are enrolled to the course of medical biotechnology at Maseno University and also the members need to demonstrate support and understanding for the purpose of this organization upon payment of the dues as outlined in Section B.", margin);
      addText("Part 2: Membership decisions will not be discriminated on the basis of race, color, gender, medical conditions and disability.", margin);
      yPos += 5;
      
      addText("Section B: Dues", margin, 10, true);
      addText("Part 1: Any new member is required to pay Ksh. 200 as their registration fee while other registered members are required to pay Ksh.100 for semester membership renewal. The members are required to pay to take part in any of the organization activities.", margin);
      yPos += 5;
      
      addText("Section C: Rights", margin, 10, true);
      addText("Part 1: All registered members are eligible to attend all the meetings and events of this organization. If a fee is charged to attend a particular event, the membership will establish a fee scale for voting members, non-voting members and others as appropriate.", margin);
      yPos += 5;
      
      addText("Section D: Revocation of Membership", margin, 10, true);
      addText("Part 1: Members may have their membership withdrawn for failure to adhere to the requirements for membership as stated above.", margin);
      addText("Part 2: A simple majority vote of the quorum of membership at a regular or special meeting shall be sufficient to withdraw membership. Members to be notified of the intention to do so in writing at least one week prior to the meeting at which the vote will be taken.", margin);
      addText("Part 3: If a member misses more than 3 sittings consecutively with no apparent reason.", margin);
      yPos += 10;
      
      // Article III
      checkPageBreak(30);
      addText("ARTICLE III: OFFICERS", margin, 11, true);
      addText("Section A: Officers", margin, 10, true);
      addText("The officers shall be:", margin);
      addText("1. Chairperson", margin + 5);
      addText("2. Vice Chairperson", margin + 5);
      addText("3. Secretary General", margin + 5);
      addText("4. Organizing Secretary", margin + 5);
      addText("5. Deputy Secretary General", margin + 5);
      addText("6. Finance Secretary", margin + 5);
      addText("7. Secretary", margin + 5);
      addText("8. Year Representatives", margin + 5);
      yPos += 5;
      
      addText("Section B: Eligibility", margin, 10, true);
      addText("Part 1: All officers and candidates for office must be MUMBSO members.", margin);
      addText("Part 2: All officers must be voting members of MUMBSO.", margin);
      yPos += 5;
      
      addText("Section C: Elections", margin, 10, true);
      addText("Part 1: Nominations for all offices will be taken from the third to last regular meeting of the academic year. Any member may nominate any other member, including himself or herself. Nominations may also be made during the election meeting itself, prior to closing of nominations and taking the vote.", margin);
      addText("Part 2: Elections will be held at the second to last meeting of the academic year. A simple majority vote of the quorum present at that meeting will be sufficient to elect an officer. If there are more than two candidates and no candidate receives a majority, there will be a run-off vote between the top two vote recipients in the general meeting.", margin);
      yPos += 5;
      
      addText("Section E: Removal from Office", margin, 10, true);
      addText("Part 1: Officers may be removed from office for failure to perform duties or for violation of membership clause. Officers to be voted upon in this regard will be notified of the intention to do so in writing at least one week prior to the meeting at which the vote will be taken.", margin);
      addText("Part 2: A two-thirds majority of quorum present at a regularly scheduled meeting shall be sufficient for removal from office.", margin);
      addText("Part 3: Any officer may resign by submitting a letter to the Chairperson. The Chairperson may resign by submitting a letter to the Vice Chairperson.", margin);
      yPos += 5;
      
      addText("Section F: Terms of Office and Vacancies", margin, 10, true);
      addText("Part 1: The term of office shall be from the last meeting of each year until the end of the second-to-last meeting of the subsequent year.", margin);
      addText("Part 2: Should a vacancy in office occur, there will be another nomination procedure and election for the vacant office.", margin);
      addText("Part 3: In the meantime, the Vice Chairperson will assume the duties of the Chairperson, the Secretary General will assume the duties of the Vice Chairperson, and the Deputy Secretary General will assume the duties of the Secretary General should those offices be vacant.", margin);
      yPos += 10;
      
      // Article IV
      checkPageBreak(30);
      addText("ARTICLE IV: DUTIES OF OFFICERS", margin, 11, true);
      addText("Section A: The Chairperson", margin, 10, true);
      addText("1. The Chairperson will chair all meetings of MUMBSO and will call special meetings as needed.", margin + 5);
      addText("2. The Chairperson will vote in case of a tie on MUMBSO matters only.", margin + 5);
      addText("3. The Chairperson will provide leadership to the group unless prevented by illness or any other sufficient cause upon which his/her duties will be presided by the Vice Chairperson.", margin + 5);
      yPos += 5;
      
      addText("Section B: Vice Chairperson", margin, 10, true);
      addText("1. The vice chairperson deputizes the chairperson.", margin + 5);
      addText("2. He/She is responsible for budget making.", margin + 5);
      addText("3. Coordinates with the secretary general and finance secretary on event planning.", margin + 5);
      yPos += 5;
      
      addText("Section C: The Secretary General", margin, 10, true);
      addText("1. The Secretary General will chair and direct the planning of the organization's briefing and event planning.", margin + 5);
      addText("2. He/She is among the bank signatories.", margin + 5);
      addText("3. Ensure MUMBSO members' grievances are adhered to.", margin + 5);
      addText("4. Ensures Certificates of members are issued upon completion of a relevant task.", margin + 5);
      addText("5. The secretary general shall chair any ad hoc committees or task forces of the organization, deputized by the vice chairperson (disciplinary committee).", margin + 5);
      yPos += 5;
      
      addText("Section D: Organizing Secretary", margin, 10, true);
      addText("1. Be in charge of Associations events with the help of the Secretary General.", margin + 5);
      addText("2. Ensures that all the events of MUMBSO are well coordinated.", margin + 5);
      addText("3. Assist in conveying notice of meeting dates and other communication.", margin + 5);
      yPos += 5;
      
      addText("Section E: Deputy Secretary General", margin, 10, true);
      addText("1. Deputizes the secretary general.", margin + 5);
      addText("2. Coordinates with the respective year representative.", margin + 5);
      yPos += 5;
      
      addText("Section F: Finance Secretary", margin, 10, true);
      addText("1. The Finance Secretary will produce all official monetary correspondence for the organization, and maintain records and report on the financial transactions of MUMBSO.", margin + 5);
      addText("2. The Finance Secretary will ensure the availability of sufficient funds to meet the primary operations of MUMBSO.", margin + 5);
      addText("3. The Finance Secretary will be required to produce a receipt for all monetary transactions.", margin + 5);
      addText("4. He /she makes a bank deposit on the same to the organization's bank account upon Executive approval.", margin + 5);
      yPos += 5;
      
      addText("Section G: Secretary", margin, 10, true);
      addText("1. Take record and file minutes, produce all official correspondence for MUMBSO.", margin + 5);
      addText("2. Maintain a current roster of membership.", margin + 5);
      yPos += 5;
      
      addText("Section H: Year Representatives", margin, 10, true);
      addText("1. Dissemination of information discussed by MUMBSO respective classes.", margin + 5);
      addText("2. Air out grievances from the members to the executive committee.", margin + 5);
      yPos += 10;
      
      // Article V
      checkPageBreak(30);
      addText("ARTICLE V: MEETINGS", margin, 11, true);
      addText("Section A: Regular Meetings", margin, 10, true);
      addText("This type of meeting will be held after two weeks during the regular school year.", margin);
      yPos += 5;
      
      addText("Section B: Special Meetings", margin, 10, true);
      addText("Special meetings may be called by the president with the approval of the executive committee.", margin);
      yPos += 10;
      
      // Article VI
      checkPageBreak(30);
      addText("ARTICLE VI: COMMITTEES", margin, 11, true);
      addText("Section A: Executive Committee", margin, 10, true);
      addText("Part 1: This is the management of the organization. The responsibility is to the entire membership is to uphold the bylaws.", margin);
      addText("Part 2: The committee shall consist of the officers as listed in Article III and the advisor.", margin);
      yPos += 5;
      
      addText("Section B: Program Committee", margin, 10, true);
      addText("Part 1: A program committee composed of the secretary general as chairperson and four other members shall be appointed by the executive committee before the end of the first semester, whose duty shall be to plan the overall program of the club.", margin);
      yPos += 5;
      
      addText("Section C: Special Committee", margin, 10, true);
      addText("Part 1: The chairperson shall have the authority to appoint any special committee, with the approval of the executive committee, from time to time as need demands.", margin);
      yPos += 5;
      
      addText("Section D: Disciplinary Committee", margin, 10, true);
      addText("Part 1: Disciplinary committee is composed of the secretary general as the chairperson. He / she is deputized by the vice chairperson and other three members chosen by the executive.", margin);
      yPos += 10;
      
      // Article VII
      checkPageBreak(30);
      addText("ARTICLE VII: ADVISOR", margin, 11, true);
      addText("Section A: Advisor Requirements", margin, 10, true);
      addText("Part 1: This organization may appoint a primary advisor by majority vote of membership.", margin);
      addText("Part 2: Other persons may serve as special advisors as needed.", margin);
      yPos += 5;
      
      addText("Section B: Duties", margin, 10, true);
      addText("1. The advisor must sign the recognition application each year.", margin + 5);
      addText("2. Assist in the orientation of new officers.", margin + 5);
      addText("3. Explain and clarify campus policy and procedure that apply to the organization.", margin + 5);
      addText("4. Maintain an awareness of the activities and programs sponsored by the student organization.", margin + 5);
      addText("5. Meet on a regular basis with the executive committee to discuss upcoming meetings, long range plans, goals and problems of the organization.", margin + 5);
      yPos += 10;
      
      // Article VIII
      checkPageBreak(30);
      addText("ARTICLE VIII: BY-LAWS AND AMENDMENTS", margin, 11, true);
      addText("Section A: By-Laws", margin, 10, true);
      addText("Part 1: By-laws can be added to this constitution by a simple majority vote of the entire membership at a regular meeting of MUMBSO.", margin);
      addText("Part 2: This constitution takes precedence over any and all by-laws.", margin);
      addText("Part 3: University policies, state and federal laws take precedence over this constitution and any and all by-laws.", margin);
      yPos += 5;
      
      addText("Section B: Amendments", margin, 10, true);
      addText("Part 1: This constitution can be amended by a two-thirds vote of the entire membership at a regular meeting of MUMBSO.", margin);
      addText("Part 2: Notification of such a motion must be made to members at least one meeting in advance of the one in which the actual vote is taken.", margin);
      
      // Save the PDF
      pdf.save("MUMBSO_Constitution.pdf");
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Constitution"
        description="The official constitution of Maseno University Medical Biotechnology Student Organization (MUMBSO), outlining our vision, mission, membership, and organizational structure."
        keywords="MUMBSO constitution, organization bylaws, student organization, medical biotechnology, membership rules"
      />
      <Header />
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={resourcesBg}
            alt="MUMBSO official constitution document"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/85 to-accent/75" />
        </div>
        <div className="container text-center relative z-10">
          <h1 className="text-4xl font-bold mb-6 text-white">MUMBSO Constitution</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Official governing document of Maseno University Medical Biotechnology Student Organization
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="flex justify-end mb-6">
            <Button onClick={handleDownloadPDF} size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download Constitution (PDF)
            </Button>
          </div>

          <Card>
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="flex justify-center">
                <img src={mumbsoLogo} alt="MUMBSO Logo" className="w-24 h-24 object-contain" />
              </div>
              <CardTitle className="text-2xl">
                Maseno University Medical Biotechnology Student Organization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6">
                  {/* Vision, Mission, Core Values */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-3">VISION</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To ensure Maseno University medical biotechnology student organization members enhance their exposure in the medical field.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-bold text-primary mb-3">MISSION</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      To integrate collaborations for research, excellence and to establish core facilities to meet the needs of advanced medical biotechnological research.
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-bold text-primary mb-3">CORE VALUES</h2>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Team work</li>
                      <li>Hard work</li>
                      <li>Creativity</li>
                    </ol>
                  </div>

                  <Separator className="my-8" />

                  {/* Article I */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE I: NAME AND OBJECTIVES</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: NAME</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      The name of the organization is Maseno University medical biotechnology student organization but shall be known as MUMBSO.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Section B: OBJECTIVES</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>To propel medical biotechnology to greater heights.</li>
                      <li>To facilitate research parasitic and microbial infections using biotechnological tools.</li>
                      <li>Coordinate industrial training and visit to the medical research institutes and maintain quality standards.</li>
                    </ol>
                  </div>

                  <Separator className="my-8" />

                  {/* Article II */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE II: MEMBERSHIP</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: Eligibility</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p className="leading-relaxed"><strong>Part 1:</strong> Membership shall be open to those who are enrolled to the course of medical biotechnology at Maseno University and also the members need to demonstrate support and understanding for the purpose of this organization upon payment of the dues as outlined in Section B.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> Membership decisions will not be discriminated on the basis of race, color, gender, medical conditions and disability.</p>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Section B: Dues</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      <strong>Part 1:</strong> Any new member is required to pay Ksh. 200 as their registration fee while other registered members are required to pay Ksh.100 for semester membership renewal. The members are required to pay to take part in any of the organization activities.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Section C: Rights</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      <strong>Part 1:</strong> All registered members are eligible to attend all the meetings and events of this organization. If a fee is charged to attend a particular event, the membership will establish a fee scale for voting members, non-voting members and others as appropriate.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Section D: Revocation of Membership</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p className="leading-relaxed"><strong>Part 1:</strong> Members may have their membership withdrawn for failure to adhere to the requirements for membership as stated above.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> A simple majority vote of the quorum of membership at a regular or special meeting shall be sufficient to withdraw membership. Members to be notified of the intention to do so in writing at least one week prior to the meeting at which the vote will be taken.</p>
                      <p className="leading-relaxed"><strong>Part 3:</strong> If a member misses more than 3 sittings consecutively with no apparent reason.</p>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Article III */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE III: OFFICERS</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: Officers</h3>
                    <p className="text-muted-foreground mb-2">The officers shall be:</p>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground mb-4">
                      <li>Chairperson</li>
                      <li>Vice Chairperson</li>
                      <li>Secretary General</li>
                      <li>Organizing Secretary</li>
                      <li>Deputy Secretary General</li>
                      <li>Finance Secretary</li>
                      <li>Secretary</li>
                      <li>Year Representatives</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section B: Eligibility</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p className="leading-relaxed"><strong>Part 1:</strong> All officers and candidates for office must be MUMBSO members.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> All officers must be voting members of MUMBSO.</p>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Section C: Elections</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p className="leading-relaxed"><strong>Part 1:</strong> Nominations for all offices will be taken from the third to last regular meeting of the academic year. Any member may nominate any other member, including himself or herself. Nominations may also be made during the election meeting itself, prior to closing of nominations and taking the vote.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> Elections will be held at the second to last meeting of the academic year. A simple majority vote of the quorum present at that meeting will be sufficient to elect an officer. If there are more than two candidates and no candidate receives a majority, there will be a run-off vote between the top two vote recipients in the general meeting.</p>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Section E: Removal from Office</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p className="leading-relaxed"><strong>Part 1:</strong> Officers may be removed from office for failure to perform duties or for violation of membership clause. Officers to be voted upon in this regard will be notified of the intention to do so in writing at least one week prior to the meeting at which the vote will be taken.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> A two-thirds majority of quorum present at a regularly scheduled meeting shall be sufficient for removal from office.</p>
                      <p className="leading-relaxed"><strong>Part 3:</strong> Any officer may resign by submitting a letter to the Chairperson. The Chairperson may resign by submitting a letter to the Vice Chairperson.</p>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Section F: Terms of Office and Vacancies</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p className="leading-relaxed"><strong>Part 1:</strong> The term of office shall be from the last meeting of each year until the end of the second-to-last meeting of the subsequent year.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> Should a vacancy in office occur, there will be another nomination procedure and election for the vacant office.</p>
                      <p className="leading-relaxed"><strong>Part 3:</strong> In the meantime, the Vice Chairperson will assume the duties of the Chairperson, the Secretary General will assume the duties of the Vice Chairperson, and the Deputy Secretary General will assume the duties of the Secretary General should those offices be vacant.</p>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  {/* Article IV */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE IV: DUTIES OF OFFICERS</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: The Chairperson</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      <li>The Chairperson will chair all meetings of MUMBSO and will call special meetings as needed.</li>
                      <li>The Chairperson will vote in case of a tie on MUMBSO matters only.</li>
                      <li>The Chairperson will provide leadership to the group unless prevented by illness or any other sufficient cause upon which his/her duties will be presided by the Vice Chairperson.</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section B: Vice Chairperson</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      <li>The vice chairperson deputizes the chairperson.</li>
                      <li>He/She is responsible for budget making.</li>
                      <li>Coordinates with the secretary general and finance secretary on event planning.</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section C: The Secretary General</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      <li>The Secretary General will chair and direct the planning of the organization's briefing and event planning.</li>
                      <li>He/She is among the bank signatories.</li>
                      <li>Ensure MUMBSO members' grievances are adhered to.</li>
                      <li>Ensures Certificates of members are issued upon completion of a relevant task.</li>
                      <li>The secretary general shall chair any ad hoc committees or task forces of the organization, deputized by the vice chairperson (disciplinary committee).</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section D: Organizing Secretary</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      <li>Be in charge of Associations events with the help of the Secretary General.</li>
                      <li>Ensures that all the events of MUMBSO are well coordinated.</li>
                      <li>Assist in conveying notice of meeting dates and other communication.</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section E: Deputy Secretary General</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      <li>Deputizes the secretary general.</li>
                      <li>Coordinates with the respective year representative.</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section F: Finance Secretary</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      <li>The Finance Secretary will produce all official monetary correspondence for the organization, and maintain records and report on the financial transactions of MUMBSO.</li>
                      <li>The Finance Secretary will ensure the availability of sufficient funds to meet the primary operations of MUMBSO.</li>
                      <li>The Finance Secretary will be required to produce a receipt for all monetary transactions.</li>
                      <li>He /she makes a bank deposit on the same to the organization's bank account upon Executive approval.</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section G: Secretary</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                      <li>Take record and file minutes, produce all official correspondence for MUMBSO.</li>
                      <li>Maintain a current roster of membership.</li>
                    </ol>

                    <h3 className="text-lg font-semibold mb-2">Section H: Year Representatives</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Dissemination of information discussed by MUMBSO respective classes.</li>
                      <li>Air out grievances from the members to the executive committee.</li>
                    </ol>
                  </div>

                  <Separator className="my-8" />

                  {/* Article V */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE V: MEETINGS</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: Regular Meetings</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      This type of meeting will be held after two weeks during the regular school year.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Section B: Special Meetings</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Special meetings may be called by the president with the approval of the executive committee.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  {/* Article VI */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE VI: COMMITTEES</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: Executive Committee</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p className="leading-relaxed"><strong>Part 1:</strong> This is the management of the organization. The responsibility is to the entire membership is to uphold the bylaws.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> The committee shall consist of the officers as listed in Article III and the advisor.</p>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Section B: Program Committee</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      <strong>Part 1:</strong> A program committee composed of the secretary general as chairperson and four other members shall be appointed by the executive committee before the end of the first semester, whose duty shall be to plan the overall program of the club.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Section C: Special Committee</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      <strong>Part 1:</strong> The chairperson shall have the authority to appoint any special committee, with the approval of the executive committee, from time to time as need demands.
                    </p>

                    <h3 className="text-lg font-semibold mb-2">Section D: Disciplinary Committee</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>Part 1:</strong> Disciplinary committee is composed of the secretary general as the chairperson. He / she is deputized by the vice chairperson and other three members chosen by the executive.
                    </p>
                  </div>

                  <Separator className="my-8" />

                  {/* Article VII */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE VII: ADVISOR</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: Advisor Requirements</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p className="leading-relaxed"><strong>Part 1:</strong> This organization may appoint a primary advisor by majority vote of membership.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> Other persons may serve as special advisors as needed.</p>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Section B: Duties</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>The advisor must sign the recognition application each year.</li>
                      <li>Assist in the orientation of new officers.</li>
                      <li>Explain and clarify campus policy and procedure that apply to the organization.</li>
                      <li>Maintain an awareness of the activities and programs sponsored by the student organization.</li>
                      <li>Meet on a regular basis with the executive committee to discuss upcoming meetings, long range plans, goals and problems of the organization.</li>
                    </ol>
                  </div>

                  <Separator className="my-8" />

                  {/* Article VIII */}
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">ARTICLE VIII: BY-LAWS AND AMENDMENTS</h2>
                    
                    <h3 className="text-lg font-semibold mb-2">Section A: By-Laws</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p className="leading-relaxed"><strong>Part 1:</strong> By-laws can be added to this constitution by a simple majority vote of the entire membership at a regular meeting of MUMBSO.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> This constitution takes precedence over any and all by-laws.</p>
                      <p className="leading-relaxed"><strong>Part 3:</strong> University policies, state and federal laws take precedence over this constitution and any and all by-laws.</p>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Section B: Amendments</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p className="leading-relaxed"><strong>Part 1:</strong> This constitution can be amended by a two-thirds vote of the entire membership at a regular meeting of MUMBSO.</p>
                      <p className="leading-relaxed"><strong>Part 2:</strong> Notification of such a motion must be made to members at least one meeting in advance of the one in which the actual vote is taken.</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Constitution;
