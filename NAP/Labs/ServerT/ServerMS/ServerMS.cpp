#include <iostream>
#include <Windows.h>
#include "ErrorHandling.h"

using namespace std;

int main()
{
	HANDLE hM; // дескриптор почтового ящика
	DWORD rb; // длина почитанного сообщения
	char rbuf[100]; // буфер ввода
	LPCTSTR SlotName = TEXT("\\\\.\\mailslot\\Box");
	try
	{
		if ((hM = CreateMailslot(SlotName, //Имя ящика
			300, //Макс. длина
			//MAILSLOT_WAIT_FOREVER, // ждать вечно
			180000, // 180000 milliseconds (180 sec = 3 min)
			NULL)) == INVALID_HANDLE_VALUE) //атрибуты безопасности
			throw SetPipeError("CreateMailslotError:", GetLastError());
		cout << "Mailslot server launched" << endl;
		cout << "Waiting for reading 3 minutes.." << endl;
		while (true)
		{
			if (!ReadFile(hM, //Дискриптор
				rbuf, // буфер
				sizeof(rbuf), // размер буфера
				&rb, // прочитано
				NULL)) // асинхронный буфер
				throw SetPipeError("ReadFileError:", GetLastError());
			cout << rbuf << endl;
		}
		//..................................................................
		CloseHandle(hM);
	}
	catch (string ErrorPipeText)
	{
		cout << endl << ErrorPipeText;
	}
}