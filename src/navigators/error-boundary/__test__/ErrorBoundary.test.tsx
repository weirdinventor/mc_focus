// import React from 'react';
// // On importe depuis '@testing-library/react' au lieu de '@testing-library/react-native'
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom'; // Pour des matchers supplémentaires comme .toBeInTheDocument()
// import { Fallback } from '../Fallback';

// // Les mocks restent identiques
// const mockedError = {
//   message: 'Mocked Error Message',
//   // La pile d'appel (stack) est souvent présente sur les vrais objets Error
//   stack: 'Error stack trace...',
// };
// const mockedFn = jest.fn();

// describe('[Fallback Component]', () => {
//   // On s'assure que notre mock est réinitialisé avant chaque test
//   beforeEach(() => {
//     mockedFn.mockClear();
//   });

//   it('renders correctly and matches snapshot', () => {
//     // 'render' retourne un objet 'container' qui contient le DOM HTML
//     const { container } = render(
//       <Fallback error={mockedError} resetErrorBoundary={mockedFn} />,
//     );

//     // .toJSON() n'est pas nécessaire, on peut directement snapshoter le conteneur HTML
//     expect(container.firstChild).toMatchSnapshot();
//   });

//   it('displays the error message', () => {
//     render(<Fallback error={mockedError} resetErrorBoundary={mockedFn} />);

//     // On utilise `screen` pour chercher les éléments de manière plus idiomatique
//     // et on vérifie que le message d'erreur est bien présent dans le document
//     const errorMessage = screen.getByText(mockedError.message);
//     expect(errorMessage).toBeInTheDocument();
//   });

//   it('calls resetErrorBoundary on button click', () => {
//     render(<Fallback error={mockedError} resetErrorBoundary={mockedFn} />);

//     // La meilleure pratique est de chercher par le rôle accessible, ici 'button'
//     // C'est plus robuste que de chercher par le texte.
//     const button = screen.getByRole('button', { name: /Réessayer/i });
    
//     // Pour le web, l'événement est 'click' au lieu de 'press'
//     fireEvent.click(button);

//     // L'assertion reste la même
//     expect(mockedFn).toHaveBeenCalledTimes(1);
//   });
// });