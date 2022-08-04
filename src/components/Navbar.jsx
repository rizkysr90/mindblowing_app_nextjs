import { SearchIcon,MenuIcon,ChevronDownIcon } from '@heroicons/react/solid'

export default function Navbar({children}) {
    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-100 shadow justify-center">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <MenuIcon className='h-8 w-8'/>
                            </label>
                        </div> 
                        <div className="flex-1 px-2 mx-2 font-bold text-3xl flex lg:block justify-center">MindBlowing</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                                <li tabIndex={0} className=''>
                                    <a className="">
                                        Category
                                        <ChevronDownIcon className="h-5 w-5"/>
                                        {/* <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg> */}
                                    </a>
                                    <ul className="p-2 bg-base-100 border-2 border-neutral">
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </li>
                                <li><a>Navbar Item 1</a></li>

                            </ul>
                        </div>
                        <div className="flex-none lg:hidden">
                            <SearchIcon className='h-8 w-8'/>
                        </div>
                    </div>
                    {/* Page content here */}
                    {children}
                </div> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay" /> 
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
                    {/* Sidebar content here */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>


        </>
    )
}   