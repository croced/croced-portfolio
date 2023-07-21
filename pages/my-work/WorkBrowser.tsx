import React from 'react';
import clsx from 'clsx';
// import { Work } from '../my-work';

interface Props {
    // work: Work[];
};

const WorkBrowser: React.FC<Props> = ({}) => {

    const [activeTab, setActiveTab] = React.useState(0);

    const renderTabs = () => {
        // // // const tabs = work.map((item, i) => {
        // // //     const drawLeftTab = i > 0;
        // // //     return (
        // // //         <div key={`work-item-${i}`} className={clsx('flex-auto', { "border-l-2 border-primary border-dashed": drawLeftTab })}>
        // // //             <div className={clsx( { "ml-2": drawLeftTab } )}>
        // // //                 <p 
        // // //                     className={clsx('text-md hover:cursor-pointer', { "underline": i === activeTab })} 
        // // //                     onClick={() => setActiveTab(i)}
        // // //                 >
        // // //                     {item.title}
        // // //                 </p>
        // // //                 <p className='text-xs'>{item.tagline}</p>
        // // //             </div>
        // // //         </div>
        // // //     );
        // // });

        // return (
        //     <div className='flex flex-row py-2 px-2'>
        //         <div className='flex flex-row gap-x-4 px-4 mr-4'>
        //             <p>o</p>
        //             <p>o</p>
        //             <p>o</p>
        //         </div>
        //         {tabs}
        //     </div>
        // );
    }

    const renderBrowserHeader = () => {
        return (
            <>
                {/* 'tab' links */}
                {renderTabs()}
                    
                {/* 'address' bar */}
                <div>
                    <hr className='border-1 border-primary border-dashed' />
                    <div className='py-4'>
                        <div className='mx-8 p-2 border-2 border-dashed rounded-md border-primary'>
                                {/* <a className='text-xs' href={work[activeTab].url} target='_blank'>{work[activeTab].url}</a> */}
                        </div>
                    </div>
                    <hr className='border-1 border-primary border-dashed' />
                </div>
            </>
        );
    }

    return (
        <>
            <div className='flex flex-col bg-primary gap-y-2'>
                <div className='flex-auto border-2 border-primary border-dashed'>

                    {renderBrowserHeader()}

                    {/* content  */}
                    <div className='py-2 px-2'>
                        {/* <img src='/my-work/synthesis/synth-view-wireframe-1.png' className='w-1/3 h-auto' /> */}
                        (header content)
                        <br />
                        more content
                        <p className='mt-64'>(footer content)</p>
                    </div>
                    
                </div>
            </div>
        </>
    );

}

export default WorkBrowser;