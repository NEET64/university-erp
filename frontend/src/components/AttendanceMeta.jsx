import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
function stringToRGB(index) {
  return "bg-indigo-400";
}

export const AttendanceMeta = () => {
  const [metadata, setMetadata] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8000/attendance/metadata/65c657dbaf0982c4aebeedc1")
      .then((response) => {
        console.log(response.data.metadata);
        setMetadata(response.data.metadata);
      });
  }, []);
  return (
    <div className="flex flex-col p-3">
      <div className="text-lg border-b font-semibold flex justify-between items-center pb-2">
        <span>Attendance</span>
        <Button asChild variant="outline">
          <Link
            className=" h-6 w-14 text-xs text-slate-400"
            to="/student/attendance">
            View All
          </Link>
        </Button>
      </div>
      {metadata.courses &&
        metadata.courses.map((courseId, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-normal">{courseId.courseName}</span>
              {/* <span className="text-sm">{`${courseId.present}/${courseId.total}`}</span> */}
              <span className="text-sm">
                {courseId.total !== 0
                  ? ` ${((courseId.present / courseId.total) * 100).toFixed(
                      0
                    )}%`
                  : "100%"}
              </span>
            </div>
            <ProgressDemo
              color={stringToRGB(courseId.courseName)}
              previous={0}
              current={
                courseId.total == 0
                  ? 100
                  : (courseId.present / courseId.total) * 100
              }
            />
          </div>
        ))}
      <div>Present: {metadata.present}</div>
      <div>Total: {metadata.total}</div>
    </div>
  );
};

export function ProgressDemo({ previous, current, color }) {
  const [progress, setProgress] = useState(previous);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(current), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} color={color} />;
}
