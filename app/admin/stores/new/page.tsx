import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { StoreForm } from "@/components/stores/stores-form";

export default function NewStorePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Nova Loja"
        description="Cadastre uma nova loja."
      />

      <StoreForm />
    </PageContainer>
  );
}