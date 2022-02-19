import { reactive, toRefs, Ref } from "vue";

interface ReturnType {
  queryForm: Ref<{
    name: string;
    type: string;
  }>;
  search: Ref<boolean>;
}
export default function (): ReturnType {
  interface DataProps {
    queryForm: {
      name: string;
      type: string;
    };
    search: boolean;
  }
  const state: DataProps = reactive({
    queryForm: {
      name: "",
      type: "",
    },
    search: false,
  });
  return {
    ...toRefs(state),
  };
}
