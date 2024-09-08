import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import useProviders from "@/composables/useProviders";
export default function () {
  const confirm = useConfirm();
  const toast = useToast();

  const { deleteProvider } = useProviders();

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

  const confirmDelete = (event: Event, id: number) => {
    confirm.require({
      target: event.currentTarget as HTMLElement,
      message: "Are you sure you want to proceed?",
      rejectProps: {
        label: "Cancel",
        severity: "secondary",
        outlined: true,
      },
      acceptProps: {
        label: "Delete",
        severity: "danger",
      },
      accept: () => {
        deleteProvider(id);
        toast.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Provider deleted",
          life: 3000,
        });
      },
      reject: () => {
        toast.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
          life: 3000,
        });
      },
    });
  };
  return { alert, confirmDelete };
}
