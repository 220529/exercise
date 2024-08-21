const m1 = `
#############
#GG.GGG#GGG.#
###.#G#G#G#G#
#.......#..G#
#G#.###.#G#G#
#GG.GGG.#.GG#
#G#.#G#.#.###
##G...G.....#
#G#.#G###.#G#
#...G#GGG.GG#
#G#.#G#G#.#G#
#GG.GGG#G.GG#
#############
`
const m2 = m1.trim().replace(/\s/g, "");
let c = Math.sqrt(m2.length);
let i = 0;
const maps = [];
while (i < c) {
    maps.push(m2.substr(i * c, c).split(""))
    i++
}
// console.log("maps", maps)