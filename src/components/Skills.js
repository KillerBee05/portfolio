import React from 'react'

const Skills = ({ skills, onDelete, onEdit }) => {
  return(
    <div>
      {skills.map((skill) => (
        <li key={skill.id}>
          {skill.skill}
        </li>
      ))}
    </div>
  )
}

export default Skills
