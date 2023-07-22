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
    const { data, error } = await supabase.from("projects").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      // order by id (ascending)
      setProjects(data.sort((a, b) => a.id - b.id));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    console.log("Projects retrieved:", projects);
  }, [projects]);

  const renderActiveProject = () => {
    const project = projects[projectIndex];

    if (!project) return <p>(loading projects...)</p>;

    return (
      <>
        <p className="text-xl">{project.title}</p>
        <p className="mt-2 text-sm">"{project.description}"</p>

        <div className="my-4">
          {project.content &&
            project.content.map((content) => {
              switch (content.type) {
                case "paragraph":
                  return <p>{content.content}</p>;
                case "image":
                  return (
                    <div className="my-4 md:my-8 flex items-center justify-center">
                      <img
                        src={content.content as string}
                        alt="project image"
                        className="max-w-full"
                      />
                    </div>
                  );
                case "slideshow":
                  return <div className="my-4 md:my-8 flex items-center justify-center">
                    <Slideshow images={content.content as string[]} /> 
                  </div>;
              }
            })}
        </div>
      </>
    );
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
          <ul className="flex flex-row gap-4 overflow-x-scroll md:overflow-x-auto whitespace-nowrap md:flex-col md:overflow-y-auto">
            <p className="md:mt-4">projects:</p>
            {projects.map((project, index) => {
              return (
                <li
                  key={`project-${index}`}
                  className={clsx(`hover:cursor-pointer`, {
                    underline: projectIndex === index,
                  })}
                  onClick={() => {
                    setProjectIndex(index);
                    window.scrollTo(0, 0);
                  }}
                >
                  {project.title}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">{renderActiveProject()}</div>
        
      </div>
    </>
  );
};

export default MyWork;
