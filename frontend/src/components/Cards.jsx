import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Cards = (params) => {
  return (
    <div className="gap-2 bg-white rounded-md my-2 flex flex-wrap">
      {params.students &&
        params.students.map((student, index) => (
          <Card key={index} className="w-60 m-2">
            <CardHeader>
              <CardTitle>{student.name}</CardTitle>
              <CardDescription>
                Enroll No.: {student.enrollmentNumber}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
};
