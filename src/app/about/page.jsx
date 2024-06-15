import Link from "next/link"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

export default function About() {
  return (
    <>
        <div className="max-w-6xl mx-auto p-3 space-y-4">
        <h1 className="text-2xl font-medium text-amber-600">About</h1>
        <p>
            Film veritabanı sitemize hoş geldiniz!
        </p>
        <p>
            Sitemiz, dünya çapındaki filmlerin kapsamlı bir veritabanını, en son haberler, incelemeler ve fragmanlarla birlikte sunmak için tasarlanmıştır.
            Film veritabanımız sürekli olarak yeni sürümlerle güncellenmektedir, böylece sinema dünyasındaki en yeni ve en iyi yapımlara erişim sağlayabilirsiniz.
            Filmleri başlık, yönetmen, oyuncu, tür veya çıkış tarihine göre arayabilir, böylece herhangi bir durum için mükemmel filmi kolayca bulabilirsiniz.
        </p>
        <p>
            Geniş film veritabanımızın yanı sıra, film severlerin en son çıkan yapımlar hakkındaki düşüncelerini paylaşabilecekleri bir platform da sunuyoruz.
            Topluluk bölümümüzde, benzer görüşlere sahip kişilerle favori filmlerinizi tartışabileceğiniz bir forum bulunmaktadır ve diğer kullanıcıların yazdığı incelemeleri ve puanlamaları okuyabilirsiniz.
            Ayrıca, sinema dünyasındaki en son gelişmeleri ve fragmanları size ulaştıran bir haber ve fragman bölümümüz de mevcuttur.
        </p>
        <p>
            Sitemizi ziyaret ettiğiniz için teşekkür ederiz ve film veritabanımızda gezinirken keyifli vakit geçirmenizi umarız.
            Geri bildiriminiz veya önerileriniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin. 
            Her zaman kullanıcı deneyimini geliştirmek ve iyileştirmek için yollar arıyoruz. Keyifli gezintiler!
        </p>
        </div>
        <divc className="flex justify-center">
            <span>Made by</span>
            <Link legacyBehavior href="https://github.com/denizdag14" passHref>
                <a className="flex items-center ml-2 text-yellow-500 font-bold" target="_blank" rel="noopener noreferrer"><FaGithub className="text-white mr-1" />denizdag</a>
            </Link>
            <Link legacyBehavior href="https://www.instagram.com/denizdag" passHref>
                <a className="flex items-center ml-2 text-yellow-500 font-bold" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-white mr-1" />denizdag</a>
            </Link>
            <Link legacyBehavior href="https://www.linkedin.com/in/denizdag14/" passHref>
                <a className="flex items-center ml-2 text-yellow-500 font-bold" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-white mr-1" />denizdag</a>
            </Link>
        </divc>
    </>
  )
}
