import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Switch from "react-switch";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function Settings() {
  const [isToggled, setisToggled] = useState(localStorage.theme === "dark");

  useEffect(() => {
    if (isToggled) {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
    // document.documentElement.classList.toggle(  "dark",  localStorage.theme === "dark" ||    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),);
    document.documentElement.classList.toggle("dark", localStorage.theme === "dark");
    console.log(isToggled, localStorage.theme);
  }, [isToggled]);

  const toggle = () => {
    setisToggled(!isToggled);
  };

  const moonSVG = (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="-5 -3 26 26" stroke="currentColor">
      <path
        className="stroke-2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  return (
    <section className="flex justify-center w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-gray-600 p-8 rounded-md">
      {/* <input className="p-3 rounded-md" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/> */}
      {/* <textarea className="p-3 rounded-md" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/> */}
      <div className="flex gap-5 bg-gray-700 p-3 rounded-md">
        <label htmlFor="dark-mode-switch"></label>
        <p className="text-lg text-white">Enable dark mode</p>
        <Switch
          className="self-center"
          id="dark-mode-switch"
          onChange={toggle}
          checked={isToggled}
          onColor="#00008B"
          uncheckedIcon={false}
          checkedIcon={moonSVG}
        />
      </div>
    </section>
  );
}
