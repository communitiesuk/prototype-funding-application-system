import React from 'react'

const CategorySection = ({category, criteria}) => (
  <>
    <h4>{category}</h4>
    {criteria.map((crit) => (
      <div key={crit.id}>
        <label>{crit.label}</label>: <input name={`${crit.type}_${crit.id}`}/> {crit.unit ?
        <span>{crit.unit}</span> : ""}
        <p className="guidance">
          {crit.guidance_notes}
        </p>
      </div>
    ))}
  </>
)


export const OutputsFormSection = ({countableFundCriteria, summableFundCriteria}) => {
  const categorisedCriteria = {}

  // TODO - refactor these 2 repetitive loops
  for (let i in countableFundCriteria) {
    const criterion = countableFundCriteria[i]
    const category = criterion.output_category

    if (!(category in categorisedCriteria)) {
      categorisedCriteria[category] = []
    }
    const typedCriterion = {
      type: 'countable',
      ...criterion
    }
    categorisedCriteria[category].push(typedCriterion)
  }

  for (let i in summableFundCriteria) {
    const criterion = summableFundCriteria[i]
    const category = criterion.output_category

    if (!(category in categorisedCriteria)) {
      categorisedCriteria[category] = []
    }
    const typedCriterion = {
      type: 'summable',
      ...criterion
    }
    categorisedCriteria[category].push(typedCriterion)
  }

  return (
    <>
      {Object.keys(categorisedCriteria).map((category, idx) => (
        <div key={"cat-" + idx}>
          <CategorySection
            category={category}
            criteria={categorisedCriteria[category]}
          />
        </div>
      ))}
    </>
  )
}
