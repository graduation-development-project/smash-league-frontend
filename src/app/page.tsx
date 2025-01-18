import HomePage from "@/components/layout/homepage";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="ml-32">
      <HomePage />
      <Button colorBtn={"gradientGreenBtn"} size={"lg"} variant={"default"}>Đăng ký</Button>
    </div>
  );
}
