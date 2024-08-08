import { FormEvent, useState } from "react";
import stl from "./App.module.css";
import { useMultistepForm } from "./hooks/useMultisteoForm";
import { AccountForm } from "./ui/AccountForm";
import { AddressForm } from "./ui/AddressForm";
import { UserForm } from "./ui/UserForm";
type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};
const App = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
  } as FormData);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) {
      next();
    }
    alert("Account create");
    console.log(data);
  };
  return (
    <div className={stl.form}>
      <form onSubmit={handleSubmit} className={stl.form__container}>
        <div className={stl.form__count}>
          {currentStepIndex + 1}/{steps.length}
        </div>
        {step}
        <div className={stl.form__btns}>
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
};

export default App;
