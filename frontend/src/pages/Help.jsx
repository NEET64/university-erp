import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Github } from "lucide-react";
export const HelpPage = () => {
  return (
    <div className="container mx-auto px-2">
      <h1 className="text-3xl text-white font-medium mb-4">Help Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">FAQs</h2>
          <p className="text-gray-700">
            Find answers to frequently asked questions here.
          </p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tutorials</h2>
          <p className="text-gray-700">
            Explore our tutorials to learn how to use our application.
          </p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you need further assistance, don't hesitate to contact us.
          </p>

          <div className="w-full flex items-center mt-4">
            <Avatar className="h-12 w-12 mr-2">
              <AvatarImage src={`https://api.multiavatar.com/neet.svg`} />
              <AvatarFallback>ND</AvatarFallback>
            </Avatar>
            <div className="flex grow justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Neet Dhameliya</h3>
                <p className="text-gray-600">
                  Email: neetdhameliya.01@gmail.com
                </p>
              </div>
              <div className="flex justify-end mt-2">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4">
                  <Linkedin />
                </a>
                <a href="https://github.com/">
                  <Github />
                </a>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center mt-4">
            <Avatar className="h-12 w-12 mr-2">
              <AvatarImage src={`https://api.multiavatar.com/harshpadas.svg`} />
              <AvatarFallback>HP</AvatarFallback>
            </Avatar>
            <div className="flex grow justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Harsh Padasala</h3>
                <p className="text-gray-600">Email: harshpadasala@gmail.com</p>
              </div>
              <div className="flex justify-end mt-2">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-4">
                  <Linkedin />
                </a>
                <a href="https://github.com/">
                  <Github />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
