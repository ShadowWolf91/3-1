#include <iostream>
#include <Windows.h>
#include "ErrorHandling.h"

using namespace std;

int main()
{
	HANDLE hM; // дескриптор почтового ящика
	DWORD wb; // длина записанного сообщения
	char wbuf[] = "Hello from Mailslot-client"; // буфер вывода
	LPCTSTR SlotName = TEXT("\\\\.\\mailslot\\Box");
	try
	{
		if ((hM = CreateFile(SlotName, //Имя ящика
			GENERIC_WRITE, // будем писать в ящик
			FILE_SHARE_READ, // разрешаем одновременно читать
			NULL, //дескр. защиты
			OPEN_EXISTING, // ящик уже есть
			NULL, NULL)) == INVALID_HANDLE_VALUE)// атрибуты файла; дескр.шаблона файла
			throw SetPipeError("CreateFileError:", GetLastError());
		cout << "Mailslot client launched" << endl;

		clock_t start, stop;
		start = clock();

		for (int i = 0; i < 10; i++)
			if (!WriteFile(hM, //Дескриптор
				wbuf, // буфер
				sizeof(wbuf), // размер буфера
				&wb, // записано
				NULL)) // асинхронный буфер
				throw SetPipeError("WriteFileError:", GetLastError());


		stop = clock();
		cout << stop - start << " ticks" << endl;
		//..................................................................
		CloseHandle(hM);
	}
	catch (string ErrorPipeText)
	{
		cout << endl << ErrorPipeText;
	}
}