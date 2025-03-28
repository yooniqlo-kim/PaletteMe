import RegisterInfoForm from "@/features/register/RegisterInfoForm";
import Container from "@/shared/components/layout/Container";

export default function RegisterPage() {
  return (
    <Container>
      <div className="flex p-10">
        <RegisterInfoForm />
      </div>
    </Container>
  );
}
