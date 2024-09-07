import { useToast } from "primevue/usetoast";

export default function () {
  const toast = useToast();

  const alert = ({
    severity,
    summary,
    detail,
  }: {
    severity: "success" | "error";
    summary: string;
    detail: string;
  }) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  return { alert };
}
