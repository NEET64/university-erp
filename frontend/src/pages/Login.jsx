import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RotateCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Tabs defaultValue="student" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <Form belongTo={"Student"} />
        </TabsContent>
        <TabsContent value="faculty">
          <Form belongTo={"Faculty"} />
        </TabsContent>
        <TabsContent value="admin">
          <Form belongTo={"Admin"} />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
};

const Form = ({ belongTo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/" + token.split(" ")[0]);
        return;
      }
    };

    fetchData();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedHandleUsernameChange = debounce((value) => {
    setUsername(value);
  }, 400);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        axios
          .post(`http://localhost:8000/${belongTo}/signin`, {
            username,
            password,
          })
          .then((response) => {
            setLoading(false);
            localStorage.setItem("token", belongTo + " " + response.data.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("role", belongTo);
            navigate("/" + belongTo);
          })
          .catch((err) => {
            setLoading(false);
            toast({
              variant: "destructive",
              title: err.message,
            });
          });
      }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={`https://api.multiavatar.com/${username}.svg`}
              />
              <AvatarFallback>{belongTo[0]}</AvatarFallback>
            </Avatar>
            <span>{belongTo} Login</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              onChange={(e) => debouncedHandleUsernameChange(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          {loading ? (
            <Button disabled className=" bg-violet-300 text-violet-800">
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="bg-violet-500 hover:bg-violet-400">
              Sign in
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};
