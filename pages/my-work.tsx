import NavigationBar from '@/components/navigation/NavigationBar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Head from 'next/head'
import TypewriterText from '@/components/common/TypewriterText';
import clsx from 'clsx';
import WorkBrowser from './my-work/WorkBrowser';
import WorkMobile from './my-work/WorkMobile';
import { supabase } from "supabase";

type Project = {
    title: string;
    description: string;
    content: ProjectContent[];
};

type ProjectContent = {
    type: "paragraph" | "image" | "slideshow";
    content: string;
};

const MyWork: React.FC = () => {

    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = async () => {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) {
            console.error('Error fetching data:', error);
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

        const project = projects[0];

        if (!project)
            return <p>(loading projects...)</p>;

        return (
            <>
                <p className='text-xl'>{project.title}</p>
                <p className='ml-8 text-sm'>{project.description}</p>
                <div className='my-4'>
                    {project.content.map((content) => {
                        switch (content.type) {
                            case "paragraph":
                                return <p>{content.content}</p>;
                            case "image":
                                return <img src={content.content} />;
                            case "slideshow":
                                return <></>;
                        }
                    })}
                </div>
            </>
        );
    }

    return (
        <> 
            <Head>
                <title>croced | my work</title>
                <meta name="description" content="my work" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            { renderActiveProject() }

        </>
    )
  }
  
export default MyWork;