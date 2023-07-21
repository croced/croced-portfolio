import React from 'react';
import clsx from 'clsx';
// import { Work } from '../my-work';

interface Props {
    // work: Work[];
};

const WorkMobile: React.FC<Props> = ({}) => {

    const [activeTab, setActiveTab] = React.useState(0);

    const renderTabs = () => {

        // const tabs = work.map((item, i) => {
        //     const drawLeftTab = i > 0;
        //     return (
        //         <div key={`work-item-${i}`} className={clsx('flex-auto w-full px-2 py-1 ', { "border-l-2 border-primary border-dashed": drawLeftTab })}>
        //             <div className={clsx( { "ml-2": drawLeftTab } )}>
        //                 <p 
        //                     className={clsx('text-md hover:cursor-pointer', { "underline": i === activeTab })} 
        //                     onClick={() => setActiveTab(i)}
        //                 >
        //                     {item.title}
        //                 </p>
        //                 {/* <p className='text-xs'>{item.tagline}</p> */}
        //             </div>
        //         </div>
        //     );
        // });

        // return (
        //     <div className='flex flex-row gap-x-2 overflow-x-scroll whitespace-nowrap'>
        //         {tabs}
        //     </div>
        // )
    }

    return (
        <>
            <div className='flex flex-col bg-primary gap-y-2'>
                <div className='flex-auto border-2 border-primary border-dashed'>
 
                    <div className='border-b-2 border-primary border-dashed px-2 py-2'>
                        {/* <select className='bg-primary text-white w-full bg-inherit' onChange={(e) => setActiveTab(parseInt(e.target.value))}>
                            {work.map((item, i) => {
                                return (
                                    <option key={i}value={i} className='bg-primary text-white bg-inherit'>{item.title}</option>
                                )
                            })}
                        </select>  */}
                        {/* {renderTabs()} */}
                    </div>
    
                    <div className='py-2 px-2'>
                        tst
                    </div>    
                    
                </div>
            </div>
        </>
    );

}

export default WorkMobile;