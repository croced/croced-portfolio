import NavigationBar from "@/components/navigation/NavigationBar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Head from "next/head";
import TypewriterText from "@/components/common/TypewriterText";
import clsx from "clsx";
import WorkBrowser from "./my-work/WorkBrowser";
import WorkMobile from "./my-work/WorkMobile";
import { supabase } from "supabase";
import useThemeProvider from "@/hooks/useThemeProvider";

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
      setProjects(data);
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
        {/* <div className={`border-2 p-4 ${theme === 'dark' ? 'border-white bg-black' : 'border-black bg-white'}`}> */}
        <p className="text-xl">{project.title}</p>
        <p className="mt-2 text-sm">{project.description}</p>
        {/* </div> */}

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
                        className="max-w-full"
                      />
                    </div>
                  );
                case "slideshow":
                  return <></>;
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

      {/* <div className='flex flex-col md:min-h-screen'>

                <div className={`md:w-auto p-4 flex flex-row gap-x-4 overflow-x-scroll whitespace-nowrap md:flex md:flex-col md:pr-16 md:sticky md:top-0 md:h-screen md:overflow-y-auto border-r-2 ${theme === 'dark' ? 'border-white bg-black' : 'border-black bg-white'}`}>
                    <p className='md:mt-8'>Projects:</p>
                    { 
                        projects.map((project, index) => {
                            return <p className={clsx(`hover:cursor-pointer`, {"underline": projectIndex === index})} onClick={() => setProjectIndex(index)}>{project.title}</p>
                        })
                    }
                </div>

                <div className='md:flex-1 md:p-4 md:overflow-y-auto'>
                    { renderActiveProject() }
                </div>

            </div> */}

      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="mb-4 md:mb-0 flex-shrink-0 w-full md:w-64 md:sticky md:top-0 md:h-screen md:flex md:flex-col md:items-start md:justify-start">
          <ul className="flex flex-row gap-4 overflow-x-scroll md:overflow-x-auto whitespace-nowrap md:flex-col md:overflow-y-auto">
            <p className="md:mt-4">projects:</p>
            { 
                projects.map((project, index) => {
                    return <li 
                        className={clsx(`hover:cursor-pointer`, {"underline": projectIndex === index})} 
                        onClick={() => {
                            setProjectIndex(index)
                            window.scrollTo(0, 0);
                        }}
                    >
                        {project.title}
                    </li>
                })
            }
          </ul>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
            { renderActiveProject() }
        </div>
      </div>
    </>
  );
};

export default MyWork;
