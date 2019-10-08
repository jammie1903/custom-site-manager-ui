import React, {useState, useEffect} from 'react'
import ProjectService from '../../services/ProjectService'

import EvaluatorService from '../../services/EvaluatorService'


export default ({pageId}) => {

  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    ProjectService.getPageData(pageId)
    .then(setPageData)
  }, [pageId]);

  useEffect(() => {
    pageData && console.log(EvaluatorService.evaluate(pageData.fields))
  }, [pageData]);

  return <div>
    fields tab
  </div>
}