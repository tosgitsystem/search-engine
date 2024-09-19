// hooks/useModal.ts
import { atom, useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';



export const modalStackState = atom<string[]>({
  key: 'modalStackState',
  default: [],
});

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});



export const useModal = () => {
  const [modalStack, setModalStack] = useRecoilState(modalStackState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const openModal = useCallback((modalId: string) => {
    setModalOpen(true);
    console.log('openModal');
 
    setModalStack((prevStack) => [...prevStack, modalId]);

    window.history.pushState({ modalId }, '', '');
  }, [setModalStack]);

  console.log('modalStack', modalStack);


  //function to close the modal
  const closeModal = useCallback(() => {
    console.log('closeModal');
    setModalOpen(false); // Pass an array of booleans
    setModalStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.pop(); // Remove the top modal
      const previousModalId = newStack[newStack.length - 1];
      window.history.pushState({ modalId: previousModalId || 'root' }, '', '');
      return newStack;
    });
  }, [setModalStack]);

  const handlePopstate = useCallback((event: PopStateEvent) => {
    if (event.state?.modalId) {
      setModalStack((prevStack) => {
        const newStack = [...prevStack];
        while (newStack.length && newStack[newStack.length - 1] !== event.state.modalId) {
          newStack.pop();
        }
        return newStack;
      });
      setModalOpen(false);
      console.log('handlePopstate clicked' );
    } else {
      setModalOpen(false);
      console.log('handlePopstate ' );
      // If no modalId is present, close all modals (typically this happens when the user navigates back to the root state)
      setModalStack([]);
    }
  }, [setModalStack]);

  useEffect(() => {
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [handlePopstate]);

  return {
    openModal,
    closeModal,
    modalStack,
    modalOpen
  };
};
