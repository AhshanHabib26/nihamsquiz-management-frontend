import { Separator } from "@/components/ui/separator";
import Container from "@/lib/Container";

interface SectionProps {
    title: string;
    children: React.ReactNode;
  }
  
  const DSection: React.FC<SectionProps> = ({ title, children }) => {
    return (
      <div className="mt-8">
        <Container>
          <div className="mb-3">
            <h1 className="text-2xl font-medium text-gray-600">{title}</h1>
            <Separator className="bg-gray-200" />
          </div>
        </Container>
        {children}
      </div>
    );
  };
  
  export default DSection;
  