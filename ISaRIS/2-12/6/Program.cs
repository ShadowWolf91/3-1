//using System;

//namespace ЛР__6
//{
//    class Program
//    {
//        static void Main(string[] args)
//        {
//            //6.1
//            string Xk = "10000000111";
//            string Xr = "11001";

//            int k = Xk.Length;
//            int n = 15;
//            int r = n - k;

//            int error;

//            int[] masXk = new int[k];
//            StrInMas(masXk, Xk);

//            int[] masXr = new int[Xr.Length];
//            StrInMas(masXr, Xr);

//            Console.WriteLine("Входная строка: " + Xk);
//            Console.WriteLine("Порождающий полином: " + Xr);
//            Console.WriteLine("k = {0}, r = {1}, n = {2}", k, r, n);

//            int[,] generationMatrix = new int[k, n];
//            CreateGenerationMatrix(generationMatrix, masXr, k, n);

//            Console.WriteLine("\nПорождающая матрица");
//            OutMatrix(generationMatrix, k, n);

//            CreateCanonicalMatrix(generationMatrix, k, n);

//            Console.WriteLine("\nКаноническая матрица");
//            OutMatrix(generationMatrix, k, n);

//            int[,] checkMatrix = new int[n, r];
//            CreateCheckMatrix(checkMatrix, generationMatrix, k, n);

//            Console.WriteLine("\nПроверочная матрица");
//            OutMatrix(checkMatrix, n, r);
//            //6.2

//            int[] masXn = new int[n];
//            Shift(masXn, masXk, r);

//            //2.
//            Console.WriteLine("\nДеление");
//            SearchResidue(masXn, masXr);

//            Console.WriteLine("Остаток:");
//            OutMass(masXn);

//            Console.WriteLine("Итоговая строка:");
//            Shift(masXn, masXk, r);
//            OutMass(masXn);

//            try
//            {
//                Console.WriteLine("Введите место первой ошибки");
//                error = Convert.ToInt32(Console.ReadLine()) - 1;
//                if (masXn[error] == 1) masXn[error] = 0;
//                else masXn[error] = 1;
//            }
//            catch { }

//            Console.WriteLine("Ошибочная строка:");
//            OutMass(masXn);

//            SearchError(masXn, masXr, checkMatrix, r);


//        }

//        public static int[] SearchError(int[] masXn, int[] masXr, int[,] checkMatrix, int r)
//        {
//            int n = masXn.Length;
//            int k = n - r;

//            int[] masXnSecond = new int[n];

//            for (int i = 0; i < n; i++)
//            {
//                masXnSecond[i] = masXn[i];
//            }

//            Console.WriteLine("\nДеление");
//            SearchResidue(masXnSecond, masXr);

//            Console.WriteLine("\nОстаток:");
//            OutMass(masXnSecond);

//            for (int i = 0; i < n; i++)
//            {
//                int coincidence = 0;
//                for (int j = 0; j < r; j++)
//                {
//                    if (checkMatrix[i, j] == masXnSecond[k + j])
//                    {
//                        coincidence++;
//                    }

//                }
//                if (coincidence == r)
//                {
//                    masXn[i] = (masXn[i] + 1) % 2;
//                    break;
//                }
//            }
//            Console.WriteLine("\nИсправленная строка:");
//            OutMass(masXn);

//            return masXn;
//        }

//        public static int[] SearchResidue(int[] masXn, int[] masXr)
//        {
//            int end = masXn.Length - masXr.Length + 1;

//            for (int i = 0; i < end; i++)
//            {
//                if (masXn[i] == 1)
//                {
//                    AddingMasMod2(masXn, masXr, i);
//                    OutMass(masXn);
//                }
//            }

//            return masXn;
//        }

//        //Сложение массивов по модулю 2 с опр. позиции
//        public static int[] AddingMasMod2(int[] mas1, int[] mas2, int pos)
//        {
//            int end = pos + mas2.Length;

//            for (int i = pos; i < end; i++)
//            {
//                mas1[i] = (mas1[i] + mas2[i - pos]) % 2;
//            }
//            return mas1;
//        }

//        //Смещение на массива r 
//        public static int[] Shift(int[] shiftMas, int[] mas, int r)
//        {
//            for (int i = 0; i < mas.Length; i++)
//            {

//                shiftMas[i] = mas[i];
//            }
//            return shiftMas;
//        }

//        //Преобразование сторки в массив
//        public static int[] StrInMas(int[] mas, string str)
//        {
//            for (int i = 0; i < str.Length; i++)
//            {
//                if (str[i] == 49)
//                    mas[i] = 1;
//                else mas[i] = 0;
//            }
//            return mas;
//        }

//        //Создание Порождающей матрицы 
//        static int[,] CreateGenerationMatrix(int[,] generationMatrix, int[] mas, int k, int n)
//        {
//            //Заполняем первую строку в проверочной матрице
//            for (int i = 0; i < n; i++)
//            {
//                if (i < mas.Length)
//                {
//                    generationMatrix[0, i] = mas[i];
//                }
//                else
//                {
//                    generationMatrix[0, i] = 0;
//                }
//            }

//            //Сдвигаем каждую строки вправо от предыдущей
//            for (int i = 1; i < k; i++)
//            {
//                for (int j = 0; j < n - 1; j++)
//                {
//                    generationMatrix[i, j + 1] = generationMatrix[i - 1, j];
//                }
//                generationMatrix[i, 0] = generationMatrix[i - 1, n - 1];
//            }



//            return generationMatrix;
//        }

//        //Приведение порождающей матрицы к каноническому виду
//        static int[,] CreateCanonicalMatrix(int[,] generationMatrix, int k, int n)
//        {
//            //Перебираем строки для преведению к каноническому виду
//            for (int i = 0; i < k; i++)
//            {
//                int i2 = i + 1;
//                //Перебираем элементы строки, но только до k-элемента
//                for (int j = i + 1; j < k; j++)
//                {

//                    //если мы нашли единицу в строке, то...
//                    if (generationMatrix[i, j] == 1)
//                    {

//                        //перебираем этот столбец, пока не найдем единицу
//                        for (; i2 < k; i2++)
//                        {
//                            bool repeat = false;
//                            //Если нашли, то складываем обе строки
//                            if (generationMatrix[i2, j] == 1)
//                            {
//                                for (int j2 = j - 1; j2 > 0; j2--)
//                                {
//                                    //Проверяем, есть ли до этой 1 еще 1, если есть то эту строку пропускаем
//                                    if (generationMatrix[i2, j2] == 1)
//                                    {
//                                        repeat = true;
//                                    }
//                                }
//                                if (repeat)
//                                    continue;
//                                Console.WriteLine(i + " " + i2);
//                                AddingLinesMatrixMod2(generationMatrix, i, i2, n);
//                                i2++;
//                                break;
//                            }
//                        }
//                    }
//                }
//            }

//            return generationMatrix;
//        }

//        //Преобразование канонической матрицы в проверочную
//        static int[,] CreateCheckMatrix(int[,] checkMatrix, int[,] generationMatrix, int k, int n)
//        {
//            int r = n - k;

//            for (int i = 0; i < k; i++)
//            {
//                for (int j = 0; j < r; j++)
//                {
//                    checkMatrix[i, j] = generationMatrix[i, k + j];
//                }
//            }

//            for (int i = k; i < n; i++)
//            {
//                for (int j = 0; j < r; j++)
//                {
//                    if (j == i - k)
//                    {
//                        checkMatrix[i, j] = 1;
//                    }
//                    else
//                    {
//                        checkMatrix[i, j] = 0;
//                    }
//                }
//            }

//            return checkMatrix;
//        }

//        //Сложение строк матрицы
//        public static int[,] AddingLinesMatrixMod2(int[,] matrix, int str1, int str2, int lengthString)
//        {
//            //Console.WriteLine(str1 + " и " + str2);
//            for (int i = 0; i < lengthString; i++)
//            {
//                matrix[str1, i] = (matrix[str1, i] + matrix[str2, i]) % 2;
//            }
//            return matrix;
//        }

//        //вывод матрицы
//        public static void OutMatrix(int[,] matrix, int k, int n)
//        {
//            for (int i = 0; i < k; i++)
//            {
//                for (int j = 0; j < n; j++)
//                {
//                    Console.Write(matrix[i, j]);
//                    //if (j + 1 == k) Console.Write("|");
//                }
//                Console.WriteLine();
//            }
//        }

//        //вывод одномерного массива
//        public static void OutMass(int[] mas)
//        {

//            for (int i = 0; i < mas.Length; i++)
//            {
//                //if (i == k) Console.Write("|");
//                Console.Write(mas[i]);
//            }
//            Console.WriteLine("\n");
//        }
//    }
//}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _6
{
    class Program
    {
        public static void ShowMatrix(byte[,] matrix, int firstAxel, int secondAxel)
        {
            for (int i = 0; i < firstAxel; i++)
            {
                for (int j = 0; j < secondAxel; j++)
                {
                    Console.Write(matrix[i, j] + " ");
                }
                Console.WriteLine();
            }
            Console.WriteLine();
        }

        static void Main(string[] args)
        {
            // 7 _ 5 _ х^5 + х^4 + х^3 + х + 1

            Random rand = new Random();
            int k = 7; //10-16
            int r = 6;
            r += 1;
            int n = k + r;
            byte[] Xr_Byte = new byte[r];
            byte[] Xr_Byte2 = new byte[r];
            byte[] E_Byte = new byte[r];

            //Xn[0] = (byte)(1);
            //for (int i = 1; i < k; i++)
            //{
            //    Xn[i] = (byte)(rand.Next(0, 2));
            //}
            //Console.WriteLine();
            //for (int i = 0; i < n; i++)
            //{
            //    Console.Write(Xn[i] + " ");
            //}

            byte[] BaseBytes = new byte[] { 1, 1, 0, 1, 1, 0, 1 };
            int firstAxelOfCreatingMatrix = r - 1;
            int secondAxelOfCreatingMatrix = (r - 1) + BaseBytes.Length - 1;
            byte[,] creatingMatrix = new byte[firstAxelOfCreatingMatrix, secondAxelOfCreatingMatrix];

            //ФОРМИРУЕМ СДВИНУТУЮ МАТРИЦУ
            Console.WriteLine("Матрица");

            for (int i = 0; i < firstAxelOfCreatingMatrix; i++)
            {
                for (int j = 0; j < BaseBytes.Length; j++)
                {
                    creatingMatrix[i, j + i] = BaseBytes[j];
                }
            }
            ShowMatrix(creatingMatrix, firstAxelOfCreatingMatrix, secondAxelOfCreatingMatrix);

            //ПРИВОДИМ СДВИНУТУЮ МАТРИЦУ К КАНОНИЧЕСКОМУ ВИДУ
            Console.WriteLine("Матрица в каноническом виде");
            byte[,] firstCanonMatrix = creatingMatrix;
            for (int row = 0; row < r; row++)
            {
                for (int i = row + 1; i < firstAxelOfCreatingMatrix; i++)
                {
                    if (firstCanonMatrix[row, i] == (byte)1)
                    {
                        for (int j = 0; j < secondAxelOfCreatingMatrix; j++)
                        {
                            firstCanonMatrix[row, j] = (byte)((firstCanonMatrix[row, j] + firstCanonMatrix[i, j]) % 2);
                        }
                    }
                }
            }
            ShowMatrix(firstCanonMatrix, firstAxelOfCreatingMatrix, secondAxelOfCreatingMatrix);

            //СОЗДАЁМ ПРОВЕРОЧНУЮ МАТРИЦУ КАНОНИЧЕСКОЙ ФОРМЫ
            Console.WriteLine("Проверочная матрица канонической формы");

            byte[,] helpMatrix = new byte[r - 1, secondAxelOfCreatingMatrix - (r - 1)];
            for (int i = 0; i < firstAxelOfCreatingMatrix; i++)
            {
                for (int j = 0; j < secondAxelOfCreatingMatrix - (r - 1); j++)
                {
                    helpMatrix[i, j] = firstCanonMatrix[i, j + r - 1];
                }
            }
            ShowMatrix(helpMatrix, r - 1, secondAxelOfCreatingMatrix - (r - 1));

            Console.WriteLine("Транспонируемая матрица");

            //ТРАНСПОНИРУЕМ МАТРИЦУ И ЗАПОЛНЯЕМ ПРОВЕРОЧНУЮ
            byte[,] checkCanonMatrix = new byte[secondAxelOfCreatingMatrix - (r - 1), secondAxelOfCreatingMatrix];
            for (int i = 0; i < r - 1; i++)
            {
                for (int j = 0; j < secondAxelOfCreatingMatrix - (r - 1); j++)
                {
                    checkCanonMatrix[j, i] = helpMatrix[i, j];
                }
            }
            //ShowMatrix(checkCanonMatrix, secondAxelOfCreatingMatrix - (r - 1), secondAxelOfCreatingMatrix );
            for (int i = 0; i < secondAxelOfCreatingMatrix - (r - 1); i++)
            {
                for (int j = r - 1; j < secondAxelOfCreatingMatrix; j++)
                {
                    if (i + (r - 1) == j)
                    {
                        checkCanonMatrix[i, j] = (byte)1;
                    }
                }
            }
            //Console.WriteLine("Заполненая матрица");

            ShowMatrix(checkCanonMatrix, secondAxelOfCreatingMatrix - (r - 1), secondAxelOfCreatingMatrix);

            int newR = Convert.ToInt32(Math.Ceiling(Math.Log(r, 2))) + 1;
            Console.WriteLine("Сообщение с ошибкой");

            byte[] Xk_Byte = new byte[k];
            for (int i = 0; i < k; i++)
            {
                Xk_Byte[i] = (byte)(rand.Next(0, 2));
            }
            foreach (byte b in Xk_Byte)
            {
                Console.Write(b + " ");
            }
            Console.WriteLine();

            for (int i = 0, XrCounter = 0; i < newR; i++, XrCounter++)
            {
                int result = 0;
                for (int j = 0; j < k; j++)
                {
                    result += (checkCanonMatrix[i, j] * Xk_Byte[j]);
                    //Console.WriteLine(checkCanonMatrix[i, j] + " * " + Xk_Byte[j] + " = " + result);
                }
                if ((result % 2) == 0)
                    Xr_Byte[XrCounter] = 0;
                if ((result % 2) == 1)
                    Xr_Byte[XrCounter] = 1;
            }


            //формируем ошибки ---------------------------------------------------------------------------------------------------------------------------

            for (int i = 0, countOfMistakes = 1; i < countOfMistakes; i++)
            {
                int placeOfMistake = rand.Next(0, k);
                if (Xk_Byte[placeOfMistake] == 1)
                    Xk_Byte[placeOfMistake] = 0;
                else
                    Xk_Byte[placeOfMistake] = 1;
            }
            //вычисляем избыточные символы 2
            for (int i = 0, XrCounter = 0; i < newR; i++, XrCounter++)
            {
                int result = 0;
                for (int j = 0; j < k; j++)
                {
                    result += (checkCanonMatrix[i, j] * Xk_Byte[j]);
                    //Console.WriteLine(checkCanonMatrix[i, j] + " * " + Xk_Byte[j] + " = " + result);
                }
                if ((result % 2) == 0)
                    Xr_Byte2[XrCounter] = 0;
                if ((result % 2) == 1)
                    Xr_Byte2[XrCounter] = 1;
            }
            Console.WriteLine();
            for (int j = 0; j < k; j++)
            {
                Console.Write(Xk_Byte[j] + " ");
            }
            for (int j = 0; j < newR; j++)
            {
                Console.Write(Xr_Byte2[j] + " ");
            }
            Console.WriteLine();


            //вычисляем синдром 
            Console.WriteLine("Синдром");
            for (int j = 0; j < newR; j++)
            {
                E_Byte[j] = (byte)(Xr_Byte[j] ^ Xr_Byte2[j]);
                Console.Write(E_Byte[j] + " ");
            }
            Console.WriteLine();

            int RowWithMistake = -1;
            for (int row = 0, counter = 0; row < k; row++)
            {
                counter = 0;
                for (int col = 0; col < newR; col++)
                {
                    if (E_Byte[col] == checkCanonMatrix[col, row])
                        counter++;
                    if (counter == newR)
                    {
                        RowWithMistake = row;
                        break;
                    }
                }
            }
            Console.WriteLine("ошибка в бите №" + (1 + RowWithMistake));
            Console.WriteLine();


            Console.ReadLine();

        }
    }
}