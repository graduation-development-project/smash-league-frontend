import TextGradientBtn from "@/components/atoms/text.gradient.btn";
import HomePage from "@/components/layout/homepage";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="ml-32">
      <HomePage />
      {/* <div className="bg-slate-700"> */}
        <TextGradientBtn textColor="orange" />
        <Button size={"lg"} colorBtn={"gradientOrangeBorderBtn"} variant={"default"}>Haha</Button>
      {/* </div> */}
    </div>
  );
}
