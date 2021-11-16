import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProject = () =>
    client("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return run(
      client(`projects/${param.id}`, {
        data: param,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
