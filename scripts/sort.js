import fs from "node:fs"

const files = ["v2ex.com.json", "twitter.com.json"]

function main() {
  for (const file of files) {
    const text = fs.readFileSync("data/" + file, "utf8")
    try {
      const json = JSON.parse(text)
      const data = json.data
      if (data) {
        // console.log(data)
        const entries = Object.entries(data)
        // console.log(entries)
        entries.sort((a, b) => {
          const keyA = a[0]
          const keyB = b[0]
          if (keyA === "meta") {
            return -1
          }
          if (keyB === "meta") {
            return 1
          }
          if (keyA === "end") {
            return 1
          }
          if (keyB === "end") {
            return -1
          }
          return keyA.localeCompare(keyB)
        })
        json.data = Object.fromEntries(entries)
      }

      fs.writeFileSync(
        "data/" + file,
        JSON.stringify(json, null, 2) + "\n",
        "utf8"
      )
    } catch (error) {
      console.error(error)
    }
  }
}

main()
