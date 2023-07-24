import React, { useEffect, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { supabase } from "supabase";
import useThemeProvider from "@/hooks/useThemeProvider";
import Slideshow from "@/components/common/Slideshow";

type Project = {
  title: string;
  description: string;
  content: ProjectContent[];
};

type ProjectContent = {
  type: "paragraph" | "image" | "slideshow";
  content: string | string[];
};

const MyWork: React.FC = () => {
  const theme = useThemeProvider();

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectIndex, setProjectIndex] = useState<number>(0);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: true });
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setProjects(data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development")
        console.log("Projects retrieved:", projects);
  }, [projects]);

  const renderActiveProject = () => {
    const project = projects[projectIndex];

    if (!project) return <p>(loading projects...)</p>;

    return (
      <>
        <p className="text-xl">{project.title}</p>
        <p className="mt-2 text-sm">{project.description}</p>

        <div className="my-4">
          {project.content &&
            project.content.map((content, index) => {
              switch (content.type) {
                case "paragraph":
                  return (
                    <p key={`${project.title}-paragraph-${index}`}>
                      {content.content}
                    </p>
                  );
                case "image":
                  return (
                    <div
                      key={`${project.title}-image-${index}`}
                      className="my-4 md:my-8 flex items-center justify-center"
                    >
                      <img
                        src={content.content as string}
                        alt="project image"
                        className="max-w-full"
                      />
                    </div>
                  );
                case "slideshow":
                  return (
                    <div
                      key={`${project.title}-slideshow-${index}`}
                      className="my-4 md:my-8 flex items-center justify-center"
                    >
                      <Slideshow images={content.content as string[]} />
                    </div>
                  );
                default:
                  return null;
              }
            })}
        </div>
      </>
    );
  };

  const onProjectClick = (index: number) => {
    setProjectIndex(index);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Head>
        <title>croced | my work</title>
        <meta name="description" content="my work" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="mb-4 md:mb-0 flex-shrink-0 w-full md:w-64 md:sticky md:top-0 md:h-screen md:flex md:flex-col md:items-start md:justify-start">
          <ul className="flex flex-row gap-4 w-full overflow-x-scroll md:overflow-x-auto whitespace-nowrap md:flex-col md:overflow-y-auto">
            <p className="md:mt-4">projects:</p>
            {projects.map((project, index) => {
              const liClasses = clsx(`hover:cursor-pointer`, {
                "font-semibold": projectIndex === index,
                "text-white/[0.6]": (projectIndex !== index) && (theme === "dark"),
                "text-black/[0.6]": (projectIndex !== index) && (theme === "light"),
              });

              return (
                <div key={`project-list-${index}`}>
                  {/* mobile view for project list item */}
                  <li
                    onClick={() => onProjectClick(index)}
                    className={clsx(liClasses, "sm:hidden")}
                  >
                    {project.title}
                  </li>

                  {/* desktop view for project list item */}
                  <li
                    onClick={() => onProjectClick(index)}
                    className={clsx(liClasses, "hidden md:block")}
                  >
                    {projectIndex === index && ">"} {project.title}
                  </li>
                </div>
              );
            })}
          </ul>
        </div>

        {/* Right Content Area */}
        <div className={`flex-1`}>{renderActiveProject()}</div>
      </div>
    </>
  );
};

export default MyWork;
