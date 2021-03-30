import React from 'react'

export const FundOutputCategorySummary = ({countableCriteria, summableCriteria}) => {
  const getUniqueOutputCategories = (countableCriteria, summableCriteria) => {
    const allCriteria = countableCriteria.concat(summableCriteria)

    const uniqueOutputCategories = allCriteria.reduce(
      (categories, criterion) => {
        let currentCategory = criterion.output_category
        if (categories.indexOf(currentCategory) == -1) {
          categories.push(currentCategory)
        }
        return categories
      }, [])
    return uniqueOutputCategories
  }

  return (
    <>
      {getUniqueOutputCategories(countableCriteria, summableCriteria).join(',')}
    </>
  )
}
