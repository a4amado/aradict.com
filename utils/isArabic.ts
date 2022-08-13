


class isArabic {
    static validate({ word }: { word: string  }) {
        if (word.length > 1) {
            return !word.split("")
              .map((char) => (this.isArabic(char) ? "" : "N"))
              .join("")
              .toString();
          }
        return this.isArabic(word)
    }
    private static  isArabic(char: string) {
        let AR = /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])*$/g;
        return char.match(AR)
    }
}



export default isArabic;