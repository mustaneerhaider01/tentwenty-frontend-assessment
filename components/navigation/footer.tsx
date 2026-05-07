import { Card, CardContent } from "../ui/card";

function Footer() {
  return (
    <footer className="container xl:max-w-[1185px] px-1 sm:px-0 sm:mx-auto mt-4">
      <Card className="py-8">
        <CardContent>
          <p className="text-gray-500 text-sm text-center">
            © 2024 tentwenty. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </footer>
  );
}

export default Footer;
