import * as sortalgo from "./sortingalgorithm.js"

let listSize = 100;
let speed = 4;
let numList = []
let divList = [];
let inProgress = false;


const ListSizeInput = document.getElementById('listSizeRange')
ListSizeInput.addEventListener('input', generateNumbersAndCreateDivs)

const speedrange = document.getElementById('speedrange')
speedrange.addEventListener('input', setSpeed)

const list_container = document.querySelector('.list-container')

const generatenewset = document.getElementById('generateBtn')
generatenewset.addEventListener('click', generateNewSet)

const algorithms_list = document.getElementById('algorithms-list')
algorithms_list.addEventListener('click', setalgorithm)



numList = createNumbers(100)
divList = createDivs(numList, divList)


/*
 *
 *HELPER FUNCTION
*/

function setalgorithm(e) {
    if (inProgress) { return }
    inProgress = true
    let algo = e.target.id
    e.target.classList.add('active');
    document.querySelectorAll('.nav #algorithms-list li').forEach(btn => {
        if (btn.id !== e.target.id) {
            btn.classList.add('disabled');
        }
    })
    runalgorithm(algo)

}

async function runalgorithm(algo) {
    switch (algo) {
        case 'bubble':
            inProgress = await sortalgo.bubble_sort(numList, divList, speed)
            break
        case 'insertion':
            inProgress = await sortalgo.insertion_sort(numList, divList, speed)
            break
        case 'selection':
            inProgress = await sortalgo.selection_sort(numList, divList, speed)
            break
        case 'quick':
            inProgress = await sortalgo.quick_sort(numList, divList, speed)
            break
        case 'merge':
            inProgress = await sortalgo.merge_sort(numList, divList, speed)
            break
        case 'heap':
            inProgress = await sortalgo.heap_sort(numList, divList, speed)
            break
        default:
            break
    }

    document.querySelectorAll('.nav #algorithms-list li').forEach(btn => {
        btn.classList = [];
    })
}

function generateNumbersAndCreateDivs(e) {
    if (inProgress) {
        e.target.value = listSize
        return
    }
    clearContainer()
    listSize = e.target.value;
    if (listSize > 150 && window.innerWidth < 700) {
        listSize = 150;
        e.target.value = 150;
    }

    numList = createNumbers(listSize)
    divList = createDivs(numList, divList)
}

function generateNewSet() {
    clearContainer()

    if (inProgress) {
        document.querySelectorAll('.nav #algorithms-list li').forEach(btn => {
            btn.classList = [];
        });
        inProgress = false;
    }
    numList = createNumbers(listSize)
    divList = createDivs(numList, divList)
}

function setSpeed(e) {
    if (inProgress) {
        e.target.value = speed
        return
    }
    speed = e.target.value
    //console.log(speed)
}

function createNumbers(listSize) {
    numList = []

    while (numList.length < listSize) {
        let num = Math.floor(Math.random() * listSize + 1)
        numList.push(num)
    }
    return numList
}


function createDivs(numList, divList) {


    divList = numList.map((number, idx) => createElementDiv(number, idx, listSize))

    return divList



}

function createElementDiv(number, idx, listSize) {

    const width = 10
    const height = number / listSize * 100

    const div = document.createElement('div')

    div.className = 'number'

    if (listSize < 50 && window.innerWidth > 700) {
        div.appendChild(document.createTextNode(`${number}`))
    }

    div.style.width = `${width}%`
    div.style.height = `${height}%`
    div.style.order = idx + 1

    list_container.appendChild(div)

    return div

}

function clearContainer() {
    list_container.innerHTML = ''
}









