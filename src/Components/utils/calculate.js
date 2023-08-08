const seatArrangements = {
    A: [1, 2, 3, 4, 5, 6, 7],
    B: [1, 2, 3, 4, 5, 6, 7],
    C: [1, 2, 3, 4, 5, 6, 7],
    D: [1, 2, 3, 4, 5, 6, 7],
    E: [1, 2, 3, 4, 5, 6, 7],
    F: [1, 2, 3, 4, 5, 6, 7],
    G: [1, 2, 3, 4, 5, 6, 7],
    H: [1, 2, 3, 4, 5, 6, 7],
    I: [1, 2, 3, 4, 5, 6, 7],
    J: [1, 2, 3, 4, 5, 6, 7],
    K: [1, 2, 3, 4, 5, 6, 7],
    L: [1, 2],
};


var selected = {};

const manageSelected = (key, value) => {
    if (!selected) {
        selected[key] = [value];
    } else {
        var found = false;
        Object.keys(selected).forEach((k) => {
            if (k === key) {
                selected[key].map((item, index) => {
                    if (item === value) {
                        selected[key].splice(index, 1);
                        found = true;
                    }
                });
            }
        });
        if (!found) {
            if (!selected[key]) {
                selected[key] = [value];
            } else {
                selected[key] = [...selected[key], value];
            }
        }
    }
}

const test1 = () => {
    manageSelected("A", 1);
    console.log(selected);
    manageSelected("B", 1);
    console.log(selected);
    manageSelected("A", 5);
    console.log(selected);
    manageSelected("A", 1);
    console.log(selected);
}

test1();