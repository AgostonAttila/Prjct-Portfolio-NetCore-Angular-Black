﻿// <auto-generated />
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace PortfolioNetCoreAngularBlack.Migrations
{
    [DbContext(typeof(PortfolioDbContext))]
    [Migration("20191028122051_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0");

            modelBuilder.Entity("Core.Fund", b =>
                {
                    b.Property<string>("ISINNumber")
                        .HasColumnType("TEXT");

                    b.Property<string>("BestMonthArrayAsString")
                        .HasColumnType("TEXT");

                    b.Property<string>("Currency")
                        .HasColumnType("TEXT");

                    b.Property<string>("Focus")
                        .HasColumnType("TEXT");

                    b.Property<string>("Management")
                        .HasColumnType("TEXT");

                    b.Property<string>("MaxLossArrayAsString")
                        .HasColumnType("TEXT");

                    b.Property<string>("MonthlyPerformanceAsString")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("OverFulFilmentArrayAsString")
                        .HasColumnType("TEXT");

                    b.Property<string>("Performance1Year")
                        .HasColumnType("TEXT");

                    b.Property<string>("Performance3Year")
                        .HasColumnType("TEXT");

                    b.Property<string>("Performance5Year")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus1")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus2")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus3")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus4")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus5")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus6")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus7")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus8")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceActualMinus9")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceAverage")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceFromBeggining")
                        .HasColumnType("TEXT");

                    b.Property<string>("PerformanceYTD")
                        .HasColumnType("TEXT");

                    b.Property<string>("SharpRateArrayAsString")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .HasColumnType("TEXT");

                    b.Property<string>("VolatilityArrayAsString")
                        .HasColumnType("TEXT");

                    b.Property<string>("WorstMonthArrayAsString")
                        .HasColumnType("TEXT");

                    b.HasKey("ISINNumber");

                    b.ToTable("Funds");
                });

            modelBuilder.Entity("Core.Management", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("FundISINNumberString")
                        .HasColumnType("TEXT");

                    b.HasKey("Name");

                    b.ToTable("Managements");
                });
#pragma warning restore 612, 618
        }
    }
}
