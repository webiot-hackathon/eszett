export { initTokuDb, TokuDb }

class TokuDb {
    tokuDict: { string: number };

    yuzuri(yuzutta: string, yuzurareta: string): void {
        this.tokuDict['yuzutta'] += 1;
        this.tokuDict['yuzurareta'] += 1;
    }

}

function initTokuDb(): TokuDb {
    const tokuDict: TokuDb = new TokuDb;
    return tokuDict
}