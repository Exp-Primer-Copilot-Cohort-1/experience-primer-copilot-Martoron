function skillsMember (member) {
  if (member.skills) {
    member.skills.forEach((skill) => {
      skill.member = member._id
      const newSkill = new Skill(skill)
      newSkill.save()
    })
  }
  return member
}