import React from 'react'

const CategorySection = ({category, criteria}) => (
  <>
    <div className={"application-output-category"}>
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
    </div>
  </>
)


export const OutputsFormSection = ({countableFundCriteria, summableFundCriteria}) => {
  const categorisedCriteria = {}

  const allCriteria = countableFundCriteria.concat(summableFundCriteria)

  for (let i in allCriteria) {
    const criterion = allCriteria[i]
    const category = criterion.output_category

    if (!(category in categorisedCriteria)) {
      categorisedCriteria[category] = []
    }
    const typedCriterion = {
      type: 'unit' in criterion ? 'summable' : 'countable',
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
