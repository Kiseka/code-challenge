"use client"

import Link from "next/link"
import { useEffect } from "react"
import AppSpinner from "~/app/global/components/AppSpinner"
import useProjectsRequest from "~/app/global/hooks/requests/useProjectsRequest"

export default function ProjectsPage() {
  const { fetchProjects, projects, loadingProjects } = useProjectsRequest()
  useEffect(()=>{
    fetchProjects()
  },[])
  return (
    <>
      <div className="flex justify-center py-10">
        <div className="w-4/5">
          <div className="flex">
            <div className=" flex-grow flex flex-col justify-center">
              <h3 className=" text-xl font-semibold ">Projects</h3>
            </div>
            <div>
              <Link href="/projects/create">
                <button className="btn-primary py-2.5">New Project</button>
              </Link>
            </div>
          </div>
          <div className="  card rounded shadow border-0 pt-0 px-0 relative overflow-x-auto pb-24 mt-2">
          
            <table className="w-full text-sm text-left mb-4  scrollable-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Type</th>
                  <th scope="col"># of Buildings</th>
                  <th scope="col">Year Built</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  projects.map((item,key)=>
                    <tr key={key}>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.type}</td>
                      <td>{item.numberOfBuildings}</td>
                      <td>{item.yearBuilt}</td>
                    </tr>
                  )
                }

              </tbody>
            </table>


            {
              loadingProjects &&
              <AppSpinner />
            }
          </div>
        </div>

      </div>

    </>
  )
}
