const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal hash when given a random object", () => {
    const event = {a: 1}
    const trivialKey = deterministicPartitionKey(event);
    const expectedTrivialKey = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
    expect(trivialKey).toBe(expectedTrivialKey);
  });
  it("Returns the literal '0' when given an object with partitionKey as string", () => {
    const event = {partitionKey: "asdfasdf"}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });
  it("Returns the literal '0' when given an object with partitionKey as object with big partiionKey object", () => {
    const event = {partitionKey: {ob: "12938719283791827391872938719283791287391872391872391872938719283719283791827391872398172938179283719283791827391872391872938179283719827391827391827938172938719283719287311293871928379182739187293871928379128739187239187239187293871928371928379182739187239817293817928371928379182739187239187293817928371982739182739182793817293871928371928731129387192837918273918729387192837912873918723918723918729387192837192837918273918723981729381792837192837918273918723918729381792837198273918273918279381729387192837192873112938719283791827391872938719283791287391872391872391872938719283719283791827391872398172938179283719283791827391872391872938179283719827391827391827938172938719283719287311293871928379182739187293871928379128739187239187239187293871928371928379182739187239817293817928371928379182739187239187293817928371982739182739182793817293871928371928731"}}
    const trivialKey = deterministicPartitionKey(event);
    const expectedTrivialKey = crypto.createHash("sha3-512").update(JSON.stringify(event.partitionKey)).digest("hex")
    
    expect(trivialKey).toBe(expectedTrivialKey);
  });
  it("Returns the literal '0' when given an object with partitionKey as object with small partiionKey object", () => {
    const event = {partitionKey: {ob: "12938719283"}}
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });
});
