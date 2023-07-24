import NavigationBar from "@/components/navigation/NavigationBar";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { supabase } from "@/supabase";
import moment from "moment";
import useThemeProvider from "@/hooks/useThemeProvider";

type Company = {
  id: number;
  company: string;
  logo: string;
};

type Role = {
  id: number;
  job: number;
  title: string;
  description: string;
  skills: string[];
  start_date: Date;
  end_date: Date;
};

type Experience = {
  company: Company;
  roles: Role[];
};

const About: React.FC = () => {
  const theme = useThemeProvider();

  const [experiences, setExperiences] = useState<Experience[]>([]);

  const getExperiences = async () => {
    try {
      const { data: companies, error: companyError } = await supabase
        .from("experience")
        .select("*");
      const { data: roles, error: roleError } = await supabase
        .from("role")
        .select("*")
        .order("start_date", { ascending: false });

      if (companyError || roleError) {
        throw new Error("Error fetching data from the database.");
      }

      const experiences: Experience[] = companies.map((company) => {
        const companyRoles = roles.filter((role) => role.job === company.id);
        return {
          company,
          roles: companyRoles,
        };
      });

      setExperiences(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  useEffect(() => {
    getExperiences();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Experiences retrieved:", experiences);
    }
  }, [experiences]);

  const renderExperience = () => {
    if (!experiences) return <p>(loading experience...)</p>;

    return (
      <div className="min-h-screen">
        <p className="font-semibold">experience</p>
        <div className="mt-4 flex flex-col gap-y-4">
          {experiences.map((exp, exp_index) => {
            return (
              <div
                key={`experience-${exp_index}`}
                className={`flex flex-row w-full p-2 border-2 ${theme === 'dark' ? 'border-white' : 'border-black'}`}
              >
                <img
                  src={exp.company.logo}
                  alt={exp.company.company}
                  className="w-12 h-12 md:w-16 md:h-16 object-cover"
                />
                <div className="flex-grow flex flex-col justify-start mx-4 gap-y-8">
                  {exp.roles.sort().map((role, role_index) => {
                    return (
                      <div key={`role-${exp_index}-${role_index}`}>
                        <p className="">
                          {role.title} @ {exp.company.company}
                        </p>
                        <div
                          className={`${
                            theme === "dark"
                              ? "text-white/[0.6]"
                              : "text-black/[0.6]"
                          }`}
                        >
                          <p>
                            {moment(role.start_date, "YYYY-MM-DD")
                              .format("MMM YYYY")
                              .toString()}{" "}
                            -{" "}
                            {moment(role.end_date, "YYYY-MM-DD")
                              .format("MMM YYYY")
                              .toString()}
                          </p>
                          <p>{role.skills.join(", ")}</p>
                        </div>
                        <p className="">{role.description ?? ""}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>croced | about</title>
        <meta name="description" content="about me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>based in liverpool...</p>
      <p>(wip)</p>

      <div className="mt-8">{renderExperience()}</div>
    </>
  );
};

export default About;
