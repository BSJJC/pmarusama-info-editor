# Form Store

The `form` store is responsible for managing form-related data in this application.

## State

### form

- **Type:** Object
- **Description:** The main form object containing information about the form.

  - `informationType` (String): Specifies the type of information, either 'form' or 'url'.
  - `date` (Number): Represents the date of the form.
  - `title` (String): Represents the title of the form.
  - `data` (Object): Contains an array of form components.

    #### Form Components

    Each form component is represented as an object with the following properties:

    - `componentName` (String): The name of the form component.
    - `data` (Mixed): The data associated with the form component.

    ##### Components' Data Structure

    - **date**
      - `date` (Number)
  
        ```typescript
        data: number;
        ```

    - **title**
      - `data` (String)

        ```typescript
        data:{
            text: string
        };
        ```

    - **h1**
      - `data` (Object)

        ```typescript
        data:{
            text: string
        };
        ```

    - **h2**
      - `data` (Object)

        ```typescript
        data:{
            text: string
        };
        ```

    - **images**
      - `data` (Object)

        ```typescript
        data:{
            images: Array<{
              url: string;
              alt: string;
            }>;
        };
        ```

    - **images-center**
      - `data` (Obejct)

        ```typescript
        data: {
            images: Array<{
              url: string;
              alt: string;
            }>;
        };
        ```

    - **p**
      - `data` (Obejct)

        ``` typescript
        type TTexts = string | null;

        data: {
            texts: TTexts[]
        };
        ````

    - **p-center**
      - `data` (Obejct)

        ```typescript
        type TTexts = string | null;

        data: {
            texts: TTexts[]
        };
        ```

    - **shop-list**
      - `data` (Obejct)

        ```typescript
        type TShopList = {
            src:string;
            url: string;
            alt: string;
        };

        data: {
            shopList: TShopList[][]
        };
        ```

    - **table**
      - `data` (Object)

        ```typescript
        type TTable = string | null;

        data: {
          table : TTable[][][]
        };
        ```

    - **ul**
      - `data` (Obejct)

        ```typescript
        type TUl = {
          label: string;
          children?: TUl[]
        }

        data: {
          ul : TUl[][]
        }
        ```

    - **list-notes**
      - `data` (Array)

        ```typescript
        type TUl = {
          title: string;
          subtitles: string;
          children: string[][]
        }

        data: {
          listNotes : TUl[]
        }
        ```