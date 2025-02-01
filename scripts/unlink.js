function parseLine(line) {
  let res = /^(\ *)- \[(.*)\]\((.*)\)/.exec(line)
  if (res) {
    return {
      space: res[1].length,
      text: res[2],
      link: res[3]
    }
  }
  res = /^(\ *)- (.*)/.exec(line)
  if (res) {
    return {
      space: res[1].length,
      text: res[2]
    }
  }
  return null
}