import { Card, CardContent } from "../ui/card";

function Footer() {
  return (
    <Card className="max-w-[1185px] mx-auto mt-4 py-8">
      <CardContent>
        <p className="text-gray-500 text-sm text-center">
          © 2024 tentwenty. All rights reserved.
        </p>
      </CardContent>
    </Card>
  );
}

export default Footer;
