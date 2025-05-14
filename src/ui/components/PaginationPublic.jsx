import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../store';

export const PaginationPublic = ( data ) => {

  // const totalPageCount = Math.ceil(totalCount / pageSize)

  const dispatch = useDispatch();

  const { token } = useSelector( state => state.auth );

  const [ linksPagination, setLinksPagination ] = useState();
  const [ prevDisabled, setPrevDisabled ] = useState(true);
  const [ nextDisabled, setNextDisabled ] = useState(false);

  useEffect(() => {
    let ready = true;

    if ( ready ) {
      setLinksPagination( data?.links );
      if ( !isNaN( data?.lastPage ) ) {
        if ( data?.lastPage === 1 ) {
          setNextDisabled(true);
          return;
        }
        if( data?.currentPage === 1 ) {
          setPrevDisabled( true );
          setNextDisabled( false );
        } else if ( data?.currentPage === data?.lastPage ) {
          setPrevDisabled( false );
          setNextDisabled( true );
        } else {
          setPrevDisabled( false );
          setNextDisabled( false );
        }
      } 
    }
    return () => {
      ready = false;
    }
  }, [data]);

  const changePage = ( page ) => {
    dispatch( getData( page, data?.path, token ) );
  }
  

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
          {  linksPagination?.map( ( { active, label }, i ) => {
            if( active ) {
              return (
                <li key={i}>
                  <span className="inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-colorPrimario border border-slate-200 text-white">{ label }</span>
                </li>
              )
            } else {
              if ( label === 'pagination.previous' ) {
                return (
                  <li key={i}>
                    <button onClick={ () => changePage( parseInt( data?.currentPage - 1 ) ) } disabled={ prevDisabled } className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${ !prevDisabled ? 'bg-white hover:bg-colorPrimario hover:text-white' : 'bg-gray-200' } border border-slate-200 text-slate-600 shadow-sm`}>
                      <span className="sr-only">Previous</span><wbr />
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                        <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
                      </svg>
                    </button>
                  </li>
                )
              } else if (  label === 'pagination.next' ){
                return (
                  <li key={i}>
                    <button onClick={ () => changePage( parseInt( data?.currentPage + 1 ) ) } disabled={ nextDisabled } className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 ${ !nextDisabled ? 'bg-white hover:bg-colorPrimario hover:text-white' : 'bg-gray-200' } border border-slate-200 text-slate-600  shadow-sm`}>
                      <span className="sr-only">Next</span><wbr />
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                        <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                      </svg>
                    </button>
                  </li>
                )
              } else {
                return (
                  <li key={i}>
                    <button onClick={ () => changePage( parseInt(label) ) } className="inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-colorPrimario border border-slate-200 text-slate-600 hover:text-white shadow-sm">
                      <span>{label}</span><wbr />
                    </button>
                  </li>
                )
              }
            }
          })}
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Mostrando <span className="font-medium text-slate-600">{ data?.from }</span> a <span className="font-medium text-slate-600">{ data?.to }</span> de <span className="font-medium text-slate-600">{ data?.total }</span> resultados
      </div>
    </div>
  )
}
