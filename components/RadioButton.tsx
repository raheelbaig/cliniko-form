import React , {useState} from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

interface selectedValue {
  onChange?: any;
}

const App: React.FC<selectedValue> = ({ onChange }) => {

  const [policy , setPolicy] = useState("accepted")

  const handleRadioButtonChange = (e: any) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
    setPolicy(selectedValue)
  };
  
  
  return (
    <RadioGroup
      label="Does the patient consent to your privacy policy?"
      color="warning"
      orientation="horizontal"
      defaultValue="accepted"
      errorMessage={policy !== "accepted" ? `Please accept the policy` : `` }
    >
      <Radio value="no-response" onChange={handleRadioButtonChange}>
        No Response
      </Radio>
      <Radio value="accepted"  onChange={handleRadioButtonChange}>
        Accepted
      </Radio>
      <Radio value="rejected" onChange={handleRadioButtonChange}>
        Rejected
      </Radio>
    </RadioGroup>
  );
};

export default App;
