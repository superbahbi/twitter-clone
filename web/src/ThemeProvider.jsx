// import React, {
//     useEffect, createContext, useState, useContext,
// } from 'react';
// import { Nullable } from 'types';

// // Now import both of your CSS files here like this:

// // Import of CSS file number 1
// import LightMode from './light.lazy.css';
// // Import of CSS file number 2
// import DarkMode from './dark.lazy.css';

// // Typescript context interface, you don't need this if not // using TS
// interface IContext {
//     theme: Nullable<string>
//     toggleTheme: () => void
// }

// const Context = createContext<IContext>({
//     theme: null,
//     toggleTheme: () => { },
// });

// // Your Provider component that returns
// // the Context.Provider
// // Let's also play with the sessionStorage,
// // so this state doesn't
// // brake with browser refresh or logouts
// const ThemeProvider: React.FC = ({ children }) => {
//     // Im initialazing here the state with any existing value in the
//     //sessionStorage, or not...
//     const [theme, setTheme] = useState<Nullable<string>>(sessionStorage.getItem('themeMode') || 'dark');

//     // this setter Fn we can pass down to anywhere
//     const toggleTheme = () => {
//         const newThemeValue = theme === 'dark' ? 'light' : 'dark';
//         setTheme(newThemeValue);
//         sessionStorage.setItem('themeMode', newThemeValue);
//     };

//     // Now the magic, this lazy css files you can use or unuse
//     // This is exactly what you need, import the CSS but also unimport
//     // the one you had imported before. An actual toggle of import in a
//     // dynamic way.. brought to you by webpack
//     useEffect(() => {
//         if (theme === 'light') {
//             DarkMode.unuse();
//             LightMode.use();
//         } else if (theme == 'dark') {
//             LightMode.unuse();
//             DarkMode.use();
//         }
//     }, [theme]);

//     return (
//         <Context.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </Context.Provider>
//     );
// };

// export default ThemeProvider;
// // This useTheme hook will give you the context anywhere to set the state of // theme and this will toggle the styles imported
// export const useTheme = () => useContext(Context);
export {};
