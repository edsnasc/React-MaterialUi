import { useCallback, useRef } from "react";

export const useVform = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const isSavingAndNew = useRef(false);
  const isSavingAndClose = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = false;
    formRef.current?.requestSubmit();
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndClose.current = false;
    formRef.current?.requestSubmit();
  }, []);

  const handleSaveAndClose = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = true;
    formRef.current?.requestSubmit();
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  return {
    formRef,

    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,

    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
  };
};
